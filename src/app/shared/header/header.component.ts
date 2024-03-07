import { Component, OnDestroy, OnInit, HostListener, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, filter, takeUntil } from 'rxjs';
import { LanService } from 'src/app/services/lan.service';
import { LoggingService } from 'src/app/services/logging.service';
import { MemberService } from 'src/app/services/member.service';
import { TokenService } from 'src/app/services/token.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  //check if user has token 
  isLogin: boolean = false;
  isInit: boolean = false;
  
  selectedLan = 'English';
  selectedItem = 1;
  kcy_level: any;
  isHiddenOnMobile: boolean = false;

  isHomePage: boolean = false;
  isDigitId: boolean = false;
  private unsubscribe$: Subject<void> = new Subject();

  isScrolled: boolean = false;

  modalRefLogin?: BsModalRef;

  constructor(
    private router: Router,
    private logServ: LoggingService,
    private storage: StorageMap,
    private memberServ: MemberService,
    private lanData: LanService,
    private userAuth: UserAuthService,
    private translate: TranslateService,
    private tokenService: TokenService,
    private modalService: BsModalService
  ) {
    // this.translate.setDefaultLang('en'); // Set default language
    // this.translate.use('en'); // Use English as the initial language

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.unsubscribe$)
    ).subscribe((event: NavigationEnd) => {
      // Call your function here
      this.handleUrlChange(event.url);
      this.checkIfHomePage(event.url);
      this.checkIfDigitId();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.isScrolled = window.scrollY > 0;
  }

  ngOnInit(): void {
    //check if current route is home
    // this.checkIfHomePage();

    this.checkIfUserLoggedIn();
    this.loadLan();
  }

  checkIfDigitId() {
    
    if (environment.Is_Digital_Id_Project) {
      console.log("Header check: digital-id page");
      this.isDigitId = true;
    } else{
      console.log("Header check: Not digital-id page");
      this.isDigitId = false;
    }
  }

  checkIfHomePage(url: string) {
    
    if (url === '/' || url === '/digital-id') {
      console.log("Header check: Home page");
      this.isHomePage = true;
    } else{
      console.log("Header check: Not Home page");
      this.isHomePage = false;
    }
  }

  linkTo(url: string) {
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  //on url change, check if user is logged in
  private handleUrlChange(url: string) {
    this.logServ.log('URL changed to:', url);
    // Call function based on the URL change
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn() {
    const token = this.tokenService.getToken();
    if (!token) {
      this.logServ.log("User is not logged in");
      this.isLogin = false;
    } else {

      this.logServ.log("User is logged in");
      //this.isLogin = true;

      this.memberServ.getMe().subscribe(
        (ret: any) => {

          if (ret.success) {

            const data = ret.data;
            console.log('data=====', data);
            this.kcy_level = data.kyc_level;
            if (data.isEmailVerified) {
              this.logServ.log("User is Verified Email");
              this.isLogin = true;
            }else{
              this.logServ.log("User is not Verified Email");
              this.isLogin = false;
            }
          }
        }
      );
      /*
      this.storage.get('kcy_level').subscribe((kcy_level: any) => {
        this.kcy_level = kcy_level;
        console.log('kcy_level===', kcy_level);
        if((kcy_level === '') || (kcy_level < 0)) {
          this.isLogin = false;
        }

        this.logServ.log("kcy_level: ", this.kcy_level);
      }
      );
      */
    }

    this.isInit = true;

  }

  selectLan(lan: string) {
    switch (lan) {
      case 'en':
        this.selectedLan = "English";
        break;
      case 'es':
        this.selectedLan = "español";
        break;
      case 'fr':
        this.selectedLan = "Français";
        break;
      case 'tk':
        this.selectedLan = "Türkçe";
        break;
      case 'kr':
        this.selectedLan = "한국인";
        break;
      case 'jp':
        this.selectedLan = "日本語";
        break;
      case 'sc':
        this.selectedLan = "简体中文";
        break;
      case 'tc':
        this.selectedLan = "繁體中文";
        break;
      default:
        lan = 'en';
        this.selectedLan = "English";
        break;
    }
    // this.logServ.log("Lan: " + lan);
    window.localStorage.setItem('Lan', lan);
    this.lanData.changeMessage(lan); //lan should be 'en', 'zh', 'es'
    this.userAuth._lan = lan;
    this.translate.use(lan); // Change the current language
  }

  loadLan() {
    let lang = window.localStorage.getItem('Lan');

    if (!lang) {
      lang = navigator.language;
      if (lang === 'zh-CN') {
        lang = 'sc';
      } else if (lang === 'zh-TW' || lang === 'zh-HK') {
        lang = 'tc';
      } else {
        lang = navigator.language.substring(0, 2);
      }
    }
    this.selectLan(lang);
  }

  openModalLogin(template: TemplateRef<any>) {
    this.modalRefLogin = this.modalService.show(template,  Object.assign({}, { class: 'modal-dialog-centered' }));
  }

}
