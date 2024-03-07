import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanService } from 'src/app/services/lan.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqList = [
    {
      "question": "How long is the maturity of the national debt?",
      "answer": "This issue is a 10-year digital treasury bond.",
      "isCollapsed": true
    },
    {
      "question": "How is the process of purchasing digital national bonds?",
      "answer": "You need to register and log in on the national bond official website or the Pay.Cool wallet, and then complete the KYC registration process to purchase the national bond.",
      "isCollapsed": true
    },
    {
      "question": "How can one purchase national bonds?",
      "answer": "You can buy national bonds online with cryptocurrency (USDT). If you wish to purchase using US dollars or other means, please email: DNB@pay.cool to contact us, and our sales representatives will assist you.",
      "isCollapsed": true
    },
    {
      "question": "Which cryptocurrencies or fiat currencies are supported for purchasing national bonds?",
      "answer": "Cryptocurrencies supported are USDT, USDC, DUSD, and BTC. Fiat currency supported is USD.",
      "isCollapsed": true
    },
    {
      "question": "Do you need to undergo KYC to purchase national bonds?",
      "answer": "Yes, you must undergo KYC to buy national bonds. You must complete KYC verification within 7 days before or after payment, otherwise, your payment will be refunded.",
      "isCollapsed": true
    },
    {
      "question": "What's the face value of the national bond? Are there minimum and maximum subscription limits?",
      "answer": "There are two types of digital national bonds issued this time: DNB has a face value of 15,000 USDT and XDNB has a face value of 100 USDT. The minimum subscription quantity is one unit, with no maximum limit. Sales will end when 1.5 billion bonds are sold.",
      "isCollapsed": true
    },
    {
      "question": "Is there a time limit for purchasing the digital national bond?",
      "answer": "You can purchase the national bond within 12 months of its release. Sales close when sold out.",
      "isCollapsed": true
    },
    {
      "question": "Is there an age limit to purchase the digital national bond?",
      "answer": "Only adults 18 and over can purchase digital national bonds, with age restrictions based on the laws and regulations of the investor's country.",
      "isCollapsed": true
    },
    {
      "question": "What's the interest rate for the bond? When and how is it disbursed?",
      "answer": "The bonds issued this time are fixed-rate bonds. The interest rates are DNB: 8%, XDNB: 7.5%. The government of El Salvador will distribute interest to the wallet address annually in every November. The first interest payment will be proportional to the actual days the bond has been held.",
      "isCollapsed": true
    },
    {
      "question": "What's the term of the bond? Is the full amount returned upon maturity? Can it be redeemed early?",
      "answer": "The holding period of the digital national bond is 10 years. Upon maturity, you can either redeem the full amount in XDNB or exchange for a limited edition commemorative gold coin (DNB). Early redemption is not supported, but it can be traded on secondary markets.",
      "isCollapsed": true
    },
    {
      "question": "What are the risks of El Salvador's digital national bond?",
      "answer": "This US dollar digital national bond is issued by the government of El Salvador and is backed by the nation's reputation.",
      "isCollapsed": true
    },
    {
      "question": "Can the bond be traded or transferred to others?",
      "answer": "Once the lock-up period ends, it can be freely traded or transferred. The maximum lock-up period is one year; if the 1.5 billion bonds are sold out within one year, the lock-up period automatically ends.",
      "isCollapsed": true
    },
    {
      "question": "Do bond returns require tax payment?",
      "answer": "The government of El Salvador offers a tax exemption on this bond's returns.",
      "isCollapsed": true
    },
    {
      "question": "Will XDNB and DNB be taken back after the bond matures?",
      "answer": "Upon redemption, XDNB will be retrieved and destroyed. Users can permanently retain the DFT representing DNB or continue trading.",
      "isCollapsed": true
    },
    {
      "question": "What's the immigration policy of the digital national bond?",
      "answer": "Investing in DNB or XDNB worth 150,000 USD qualifies for a family permanent residency; 375,000 USD qualifies for family citizenship.",
      "isCollapsed": true
    },
    {
      "question": "Once the immigration conditions are satisfied, what's the immigration process?",
      "answer": "After meeting the standard, you'll fill out an application, which will be reviewed by El Salvador's immigration department. We will assign a specialist to assist you.\n\nApplicants for permanent residency should provide:\nApplication form\nPassport copies and related notarized documents, or birth certificates with notarization\nProof of no criminal record\nMarriage status (married, single, divorced) and proof\nProof of purchasing at least 10 DNB for permanent residency application\nWhen the permanent residency is approved, you need to submit the original passport\n\nApplicants for citizenship should provide:\nApplication form\nPassport copies and related notarized documents, or birth certificates with notarization\nProof of no criminal record\nMarriage status (married, single, divorced) and proof\nProof of purchasing at least 10 DNB for citizenship eligibility\nWhen citizenship is approved, you need to submit the original passport or birth certificate with notarization",
      "isCollapsed": true
    },
    {
      "question": "For family permanent residency or citizenship, how many family members can be applied for at most?",
      "answer": "\"Family\" refers to a spouse and children under 18. Typically, up to 5 people (legal fees include family green card $3,000, family citizenship $4,000. For families larger than 5 people, an additional $200 per person).",
      "isCollapsed": true
    },
    {
      "question": "Are bond assets stored on the bond website or in a wallet?",
      "answer": "Both DNB and XDNB will be delivered to the investor's Pay.Cool wallet, managed by the investor.",
      "isCollapsed": true
    },
    {
      "question": "On which blockchain is the digital national bond issued? Which wallet can be used to receive and manage it?",
      "answer": "DNB and XDNB are issued on the FAB blockchain. The FAB technical team supports and advises on the blockchain technology for El Salvador's digital national bond. They can be stored and managed in the Pay.cool wallet, and Pay.cool is the exclusive underwriter for El Salvador's digital national bond.",
      "isCollapsed": true
    }
  ];


  faqListsc = [
    {
      "question": "国债的到期期限有多长？",
      "answer": "这是一种为期10年的数字国库券。",
      "isCollapsed": true
    },
    {
      "question": "购买数字国库券的流程是怎样的？",
      "answer": "您需要在国库券官方网站或 Pay.Cool 钱包上注册并登录，然后完成KYC注册过程以购买国债。",
      "isCollapsed": true
    },
    {
      "question": "如何购买国债？",
      "answer": "您可以使用加密货币（USDT）在线购买国债。如果您希望使用美元或其他方式购买，请发送电子邮件至：DNB@pay.cool 联系我们，我们的销售代表将为您提供帮助。",
      "isCollapsed": true
    },
    {
      "question": "支持购买国债的加密货币或法定货币有哪些？",
      "answer": "支持的加密货币包括USDT、USDC、DUSD和BTC。支持的法定货币是美元。",
      "isCollapsed": true
    },
    {
      "question": "购买国债需要进行KYC吗？",
      "answer": "是的，您必须进行KYC才能购买国债。您必须在支付前或支付后的7天内完成KYC验证，否则您的支付将被退还。",
      "isCollapsed": true
    },
    {
      "question": "国债的面值是多少？是否有最低和最高认购限额？",
      "answer": "此次发行的数字国债分为两种：DNB的面值为15,000 USDT，XDNB的面值为100 USDT。最低认购数量为一份，没有最高限制。销售将在15亿国债售完时结束。",
      "isCollapsed": true
    },
    {
      "question": "购买数字国债有时间限制吗？",
      "answer": "您可以在国债发行后的12个月内购买。售罄即结束销售。",
      "isCollapsed": true
    },
    {
      "question": "购买数字国债是否有年龄限制？",
      "answer": "只有年满18岁的成年人才能购买数字国债，年龄限制根据投资者所在国家的法律法规而定。",
      "isCollapsed": true
    },
    {
      "question": "国债的利率是多少？何时和如何支付？",
      "answer": "此次发行的国债是固定利率国债。利率为DNB：8%，XDNB：7.5%。萨尔瓦多政府将于每年11月向钱包地址分发利息。首次利息支付将按国债实际持有天数的比例进行。",
      "isCollapsed": true
    },
    {
      "question": "国债的期限是多长？到期时是否返还全额？能否提前赎回？",
      "answer": "数字国债的持有期限为10年。到期时，您可以选择以XDNB的全额赎回或兑换限量纪念金币（DNB）。不支持提前赎回，但可以在二级市场交易。",
      "isCollapsed": true
    },
    {
      "question": "萨尔瓦多的数字国债存在哪些风险？",
      "answer": "这是由萨尔瓦多政府发行的美元数字国债，由国家声誉支持。",
      "isCollapsed": true
    },
    {
      "question": "国债是否可以交易或转让给他人？",
      "answer": "一旦锁定期结束，国债可以自由交易或转让。最长锁定期为一年；如果15亿国债在一年内售罄，锁定期将自动结束。",
      "isCollapsed": true
    },
    {
      "question": "国债的回报是否需要交税？",
      "answer": "萨尔瓦多政府提供对此国债回报的税收豁免。",
      "isCollapsed": true
    },
    {
      "question": "国债到期后是否会回购XDNB和DNB？",
      "answer": "在赎回时，XDNB将被回收和销毁。用户可以永久保留代表DNB的DFT，或继续交易。",
      "isCollapsed": true
    },
    {
      "question": "数字国债的移民政策是什么？",
      "answer": "投资价值150,000美元的DNB或XDNB符合家庭永久居留资格；375,000美元符合家庭入籍资格。",
      "isCollapsed": true
    },
    {
      "question": "一旦满足移民条件，移民流程是什么？",
      "answer": "在满足标准后，您将填写申请表格，将由萨尔瓦多的移民部门进行审查。我们将指派专业人员协助您。\n\n永久居留申请人应提供：\n申请表格\n护照复印件和相关公证文件，或附有公证的出生证明\n无犯罪记录证明\n婚姻状况（已婚、单身、离异）和相关证明\n购买至少10份DNB的永久居留申请证明\n永久居留批准后，您需要提交原始护照\n\n入籍申请人应提供：\n申请表格\n护照复印件和相关公证文件，或附有公证的出生证明\n无犯罪记录证明\n婚姻状况（已婚、单身、离异）和相关证明\n购买至少10份DNB以符合入籍资格\n入籍批准后，您需要提交原始护照或带公证的出生证明",
      "isCollapsed": true
    },
    {
      "question": "家庭永久居留或入籍最多可以申请多少家庭成员？",
      "answer": "“家庭”指的是配偶和18岁以下的子女。通常最多可申请5人（法律费用包括家庭绿卡3,000美元，家庭入籍4,000美元。对于家庭成员超过5人的家庭，每人额外费用200美元）。",
      "isCollapsed": true
    },
    {
      "question": "国债资产存储在国债网站还是钱包中？",
      "answer": "DNB和XDNB都将交付给投资者的Pay.Cool钱包，并由投资者管理。",
      "isCollapsed": true
    },
    {
      "question": "数字国债发行在哪个区块链上？哪个钱包可用于接收和管理？",
      "answer": "DNB和XDNB在FAB区块链上发行。FAB技术团队支持和提供有关萨尔瓦多数字国债区块链技术的咨询。它们可以存储和管理在Pay.cool钱包中，而Pay.cool是萨尔瓦多数字国债的独家承销商。",
      "isCollapsed": true
    }
  ];



  faqListtc = [
    {
      "question": "國債的到期期限有多長？",
      "answer": "這是一種為期10年的數字國庫券。",
      "isCollapsed": true
    },
    {
      "question": "購買數字國庫券的流程是怎樣的？",
      "answer": "您需要在國庫券官方網站或 Pay.Cool 錢包上註冊並登錄，然後完成KYC註冊過程以購買國債。",
      "isCollapsed": true
    },
    {
      "question": "如何購買國債？",
      "answer": "您可以使用加密貨幣（USDT）在線購買國債。如果您希望使用美元或其他方式購買，請發送電子郵件至：DNB@pay.cool 聯繫我們，我們的銷售代表將為您提供幫助。",
      "isCollapsed": true
    },
    {
      "question": "支持購買國債的加密貨幣或法定貨幣有哪些？",
      "answer": "支持的加密貨幣包括USDT、USDC、DUSD和BTC。支持的法定貨幣是美元。",
      "isCollapsed": true
    },
    {
      "question": "購買國債需要進行KYC嗎？",
      "answer": "是的，您必須進行KYC才能購買國債。您必須在支付前或支付後的7天內完成KYC驗證，否則您的支付將被退還。",
      "isCollapsed": true
    },
    {
      "question": "國債的面值是多少？是否有最低和最高認購限額？",
      "answer": "此次發行的數字國債分為兩種：DNB的面值為15,000 USDT，XDNB的面值為100 USDT。最低認購數量為一份，沒有最高限制。銷售將在15億國債售完時結束。",
      "isCollapsed": true
    },
    {
      "question": "購買數字國債有時間限制嗎？",
      "answer": "您可以在國債發行後的12個月內購買。售罄即結束銷售。",
      "isCollapsed": true
    },
    {
      "question": "購買數字國債是否有年齡限制？",
      "answer": "只有年滿18歲的成年人才能購買數字國債，年齡限制根據投資者所在國家的法律法規而定。",
      "isCollapsed": true
    },
    {
      "question": "國債的利率是多少？何時和如何支付？",
      "answer": "此次發行的國債是固定利率國債。利率為DNB：8%，XDNB：7.5%。薩爾瓦多政府將於每年11月向錢包地址分發利息。首次利息支付將按國債實際持有天數的比例進行。",
      "isCollapsed": true
    },
    {
      "question": "國債的期限是多長？到期時是否返還全額？能否提前贖回？",
      "answer": "數字國債的持有期限為10年。到期時，您可以選擇以XDNB的全額贖回或兌換限量紀念金幣（DNB）。不支持提前贖回，但可以在二級市場交易。",
      "isCollapsed": true
    },
    {
      "question": "薩爾瓦多的數字國債存在哪些風險？",
      "answer": "這是由薩爾瓦多政府發行的美元數字國債，由國家聲譽支持。",
      "isCollapsed": true
    },
    {
      "question": "國債是否可以交易或轉讓給他人？",
      "answer": "一旦鎖定期結束，國債可以自由交易或轉讓。最長鎖定期為一年；如果15億國債在一年內售罄，鎖定期將自動結束。",
      "isCollapsed": true
    },
    {
      "question": "國債的回報是否需要交稅？",
      "answer": "薩爾瓦多政府提供對此國債回報的稅收豁免。",
      "isCollapsed": true
    },
    {
      "question": "國債到期後是否會回購XDNB和DNB？",
      "answer": "在贖回時，XDNB將被回收和銷毀。用戶可以永久保留代表DNB的DFT，或繼續交易。",
      "isCollapsed": true
    },
    {
      "question": "數字國債的移民政策是什麼？",
      "answer": "投資價值150,000美元的DNB或XDNB符合家庭永久居留資格；375,000美元符合家庭入籍資格。",
      "isCollapsed": true
    },
    {
      "question": "一旦滿足移民條件，移民流程是什麼？",
      "answer": "在滿足標準後，您將填寫申請表格，將由薩爾瓦多的移民部門進行審查。我們將指派專業人員協助您。\n\n永久居留申請人應提供：\n申請表格\n護照複印件和相關公證文件，或附有公證的出生證明\n無犯罪記錄證明\n婚姻狀況（已婚、單身、離異）和相關證明\n購買至少10份DNB的永久居留申請證明\n永久居留批准後，您需要提交原始護照\n\n入籍申請人應提供：\n申請表格\n護照複印件和相關公證文件，或附有公證的出生證明\n無犯罪記錄證明\n婚姻狀況（已婚、單身、離異）和相關證明\n購買至少10份DNB以符合入籍資格\n入籍批准後，您需要提交原始護照或帶公證的出生證明",
      "isCollapsed": true
    },
    {
      "question": "家庭永久居留或入籍最多可以申請多少家庭成員？",
      "answer": "“家庭”指的是配偶和18歲以下的子女。通常最多可申請5人（法律費用包括家庭綠卡3,000美元，家庭入籍4,000美元。對於家庭成員超過5人的家庭，每人額外費用200美元）。",
      "isCollapsed": true
    },
    {
      "question": "國債資產存儲在國債網站還是錢包中？",
      "answer": "DNB和XDNB都將交付給投資者的Pay.Cool錢包，並由投資者管理。",
      "isCollapsed": true
    },
    {
      "question": "數字國債發行在哪個區塊鏈上？哪個錢包可用於接收和管理？",
      "answer": "DNB和XDNB在FAB區塊鏈上發行。FAB技術團隊支持和提供有關薩爾瓦多數字國債區塊鏈技術的諮詢。它們可以存儲和管理在Pay.cool錢包中，而Pay.cool是薩爾瓦多數字國債的獨家承銷商。",
      "isCollapsed": true
    }
  ];

  faqListes = [
    {
      "question": "¿Cuál es el plazo de vencimiento de la deuda nacional?",
      "answer": "Este es un bono del tesoro digital a 10 años.",
      "isCollapsed": true
    },
    {
      "question": "¿Cómo es el proceso de compra de bonos nacionales digitales?",
      "answer": "Debe registrarse e iniciar sesión en el sitio web oficial de bonos nacionales o en la billetera Pay.Cool, y luego completar el proceso de registro KYC para comprar el bono nacional.",
      "isCollapsed": true
    },
    {
      "question": "¿Cómo se pueden comprar bonos nacionales?",
      "answer": "Puede comprar bonos nacionales en línea con criptomonedas (USDT). Si desea comprar utilizando dólares estadounidenses u otros medios, envíe un correo electrónico a: DNB@pay.cool para ponerse en contacto con nosotros, y nuestros representantes de ventas le asistirán.",
      "isCollapsed": true
    },
    {
      "question": "¿Qué criptomonedas o monedas fiduciarias se admiten para la compra de bonos nacionales?",
      "answer": "Las criptomonedas admitidas son USDT, USDC, DUSD y BTC. La moneda fiduciaria admitida es el USD.",
      "isCollapsed": true
    },
    {
      "question": "¿Es necesario someterse al KYC para comprar bonos nacionales?",
      "answer": "Sí, debe someterse al KYC para comprar bonos nacionales. Debe completar la verificación KYC dentro de los 7 días antes o después del pago, de lo contrario, su pago será reembolsado.",
      "isCollapsed": true
    },
    {
      "question": "¿Cuál es el valor nominal del bono nacional? ¿Existen límites mínimos y máximos de suscripción?",
      "answer": "Esta vez se emiten dos tipos de bonos nacionales digitales: DNB tiene un valor nominal de 15,000 USDT y XDNB tiene un valor nominal de 100 USDT. La cantidad mínima de suscripción es una unidad, sin límite máximo. Las ventas finalizarán cuando se vendan 1.5 mil millones de bonos.",
      "isCollapsed": true
    },
    {
      "question": "¿Hay un límite de tiempo para comprar el bono nacional digital?",
      "answer": "Puede comprar el bono nacional dentro de los 12 meses posteriores a su lanzamiento. Las ventas se cierran cuando se agotan.",
      "isCollapsed": true
    },
    {
      "question": "¿Existe un límite de edad para comprar el bono nacional digital?",
      "answer": "Solo los adultos mayores de 18 años pueden comprar bonos nacionales digitales, con restricciones de edad basadas en las leyes y regulaciones del país del inversor.",
      "isCollapsed": true
    },
    {
      "question": "¿Cuál es la tasa de interés del bono? ¿Cuándo y cómo se distribuye?",
      "answer": "Los bonos emitidos esta vez son bonos de tasa fija. Las tasas de interés son DNB: 8%, XDNB: 7.5%. El gobierno de El Salvador distribuirá los intereses a la dirección de la billetera anualmente en noviembre. El primer pago de intereses será proporcional a los días reales que se haya mantenido el bono.",
      "isCollapsed": true
    },
    {
      "question": "¿Cuál es el plazo del bono? ¿Se devuelve el monto total al vencimiento? ¿Se puede redimir anticipadamente?",
      "answer": "El período de tenencia del bono nacional digital es de 10 años. Al vencimiento, puede optar por canjear el monto total en XDNB o cambiarlo por una moneda de oro conmemorativa de edición limitada (DNB). No se admite la redención anticipada, pero se puede negociar en mercados secundarios.",
      "isCollapsed": true
    },
    {
      "question": "¿Cuáles son los riesgos del bono nacional digital de El Salvador?",
      "answer": "Este bono nacional digital en dólares estadounidenses es emitido por el gobierno de El Salvador y está respaldado por la reputación de la nación.",
      "isCollapsed": true
    },
    {
      "question": "¿Se pueden negociar o transferir los bonos?",
      "answer": "Una vez que finaliza el período de bloqueo, se pueden negociar o transferir libremente los bonos. El período máximo de bloqueo es de un año; si se venden 1.5 mil millones de bonos dentro de un año, el período de bloqueo finaliza automáticamente.",
      "isCollapsed": true
    },
    {
      "question": "¿Los rendimientos de los bonos requieren el pago de impuestos?",
      "answer": "El gobierno de El Salvador ofrece una exención fiscal en los rendimientos de este bono.",
      "isCollapsed": true
    },
    {
      "question": "¿Se recuperarán XDNB y DNB después de que venza el bono?",
      "answer": "Al canjear, se recuperará y destruirá XDNB. Los usuarios pueden conservar permanentemente el DFT que representa a DNB o seguir negociándolo.",
      "isCollapsed": true
    },
    {
      "question": "¿Cuál es la política de inmigración del bono nacional digital?",
      "answer": "Invertir en DNB o XDNB por un valor de 150,000 USD califica para la residencia permanente de una familia; 375,000 USD califica para la ciudadanía familiar.",
      "isCollapsed": true
    },
    {
      "question": "Una vez que se cumplan las condiciones de inmigración, ¿cuál es el proceso de inmigración?",
      "answer": "Después de cumplir con el estándar, completará una solicitud que será revisada por el departamento de inmigración de El Salvador. Asignaremos un especialista para ayudarlo.\n\nLos solicitantes de residencia permanente deben proporcionar:\nFormulario de solicitud\nCopia de pasaporte y documentos notarizados relacionados, o certificados de nacimiento con notarización\nPrueba de ausencia de antecedentes penales\nEstado civil (casado, soltero, divorciado) y prueba\nPrueba de compra de al menos 10 DNB para la solicitud de residencia permanente\nCuando se apruebe la residencia permanente, deberá presentar el pasaporte original.\n\nLos solicitantes de ciudadanía deben proporcionar:\nFormulario de solicitud\nCopia de pasaporte y documentos notarizados relacionados, o certificados de nacimiento con notarización\nPrueba de ausencia de antecedentes penales\nEstado civil (casado, soltero, divorciado) y prueba\nPrueba de compra de al menos 10 DNB para la elegibilidad para la ciudadanía\nCuando se apruebe la ciudadanía, deberá presentar el pasaporte original o el certificado de nacimiento con notarización.",
      "isCollapsed": true
    },
    {
      "question": "¿Para la residencia permanente o la ciudadanía familiar, cuántos miembros de la familia se pueden solicitar como máximo?",
      "answer": "\"Familia\" se refiere a cónyuge e hijos menores de 18 años. Por lo general, hasta 5 personas (los honorarios legales incluyen tarjeta de residencia familiar $3,000, ciudadanía familiar $4,000. Para familias con más de 5 personas, se aplican $200 adicionales por persona).",
      "isCollapsed": true
    },
    {
      "question": "¿Los activos de los bonos se almacenan en el sitio web de los bonos o en una billetera?",
      "answer": "Tanto DNB como XDNB se entregarán a la billetera Pay.Cool del inversor, gestionada por el inversor.",
      "isCollapsed": true
    },
    {
      "question": "¿En qué blockchain se emite el bono nacional digital? ¿Qué billetera se puede utilizar para recibirlo y gestionarlo?",
      "answer": "DNB y XDNB se emiten en la cadena de bloques FAB. El equipo técnico de FAB respalda y asesora sobre la tecnología de blockchain para el bono nacional digital de El Salvador. Se pueden almacenar y gestionar en la billetera Pay.cool, y Pay.cool es el suscriptor exclusivo del bono nacional digital de El Salvador.",
      "isCollapsed": true
    }
  ];



  currentLanguage: string = 'en';

  constructor(private lanService: LanService) { }

  ngOnInit() {
    // Subscribe to the currentMessage observable to get updates
    this.lanService.currentMessage.subscribe((language: string) => {
      this.currentLanguage = language;
      // Do something with the currentLanguage, e.g., update the UI
      console.log('Current language:', this.currentLanguage);

      // this.faqList = this.getFAQlist(this.currentLanguage);
    });
  }


  getFAQlist(lan: string) {
    switch (lan) {
      case 'en': return this.faqList;
        break;
      case 'sc': return this.faqListsc;
        break;
      case 'tc': return this.faqListtc;
        break;
      case 'es': return this.faqListes;

      default: return this.faqList;
    }
  }

}
