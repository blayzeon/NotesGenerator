/* NotesGenerator */
document.getElementById('version-number').innerHTML = `0.111521`;
/* 

    ~'.'.'.'... Created by Kristine Carter ...'.'.'.'~
        -==--------------- 2021 ---------------=- 

*/

// defaults
let goColor = `#40a98e`;
let cnColor = `#66347f`;
let vmColor = `#7ba5ba`;

function defaultColors(){
    if (document.body.contains(document.getElementById('cn-picker'))){
        document.getElementById('cn-picker').value = cnColor;
        document.getElementById('go-picker').value = goColor;
        document.getElementById('vm-picker').value = vmColor;
     
     }
}
function clearStorage(type){
    if (type == "themes"){
        localStorage.setItem('cnColor', '#66347f');
        localStorage.setItem('goColor', '#40a98e');
        localStorage.setItem('vmColor', '#7ba5ba');
        updatePage();
        defaultColors();
    }
}

// styles
function setStyle(color){
    function isBright(color){
        // adjusts the color for the buttons so text is readable
        const hex = color.replace('#', '');
        let r = parseInt(hex.substr(0,2),16);
        let g = parseInt(hex.substr(2,2,),16);
        let b = parseInt(hex.substr(4,2),16);
        const brightness = ((r*299)+(g*587)+(b*114)) / 1000;
        
        if (brightness < 155){
            // dark
            return false;
        } else {
            // too bright
            let percent = -35;
           r = parseInt(r * (100 + percent) / 100);    
           b = parseInt(b * (100 + percent) / 100);    
           g = parseInt(g * (100 + percent) / 100);

           r = (r<255)?r:255;
           g = (g<255)?g:255;
           b = (b<255)?b:255;

           let rr = ((r.toString(16).length==1?"0"+r.toString(16):r.toString(16)));
           let bb = ((b.toString(16).length==1?"0"+b.toString(16):b.toString(16)));
           let gg = ((g.toString(16).length==1?"0"+g.toString(16):g.toString(16)));
            return `#${rr}${gg}${bb}`;
        }
    }

    function defaultColors(hex){
        // css variables
        const root = document.querySelector(':root');

        // sets the accent color to the hex value provided
        root.style.setProperty('--accentColor', hex);

        // returns false if its not a bright color, but provides a darker color if it is bright
        let result = isBright(hex); 
        if (result != false){
            let dark = 'black';
            root.style.setProperty('--darkestColor', dark);
            root.style.setProperty('--lightestColor', result);
            root.style.setProperty('--primaryColor', '#eeeeee');
        } else {
            root.style.setProperty('--darkestColor', 'black');
            root.style.setProperty('--lightestColor', 'white');
            root.style.setProperty('--primaryColor', '#eeeeee');
        }
    }

    if (color == "cnColor"){
        defaultColors(cnColor);
    } else if (color == "goColor"){
        defaultColors(goColor);
    } else if (color == "vmColor"){
        defaultColors(vmColor);
    } else {
        defaultColors(color);
    }

}


// format the name for the opening script
function generateFirstName(){
    const repName = document.getElementById('form-rep').value;

    for (i = 0; i < repName.length; i++){
        if (repName[i] == " "){
            return repName.slice(0,i);
        }
    }
    return "________";
}

// generate the rep's notes when the copy button is pressed
function generateNotes(){
    // form elements
    const items = [
        {
            label: "#",
            id: document.getElementById('form-number'),
            group: document.getElementById("number-group"),
        },
        {
            label: "issue",
            id: document.getElementById('form-issue'),
            group: document.getElementById("issue-group"),
        },
        {
            label: "cx",
            id: document.getElementById('form-customer'),
            group: document.getElementById("customer-group"),
        },
        {
            label: "fac",
            id: document.getElementById('form-facility'),
            group: document.getElementById("facility-group"),
        },
        {
            label: "pc",
            id: document.getElementById('form-passcode'),
            group: document.getElementById("passcode-group"),
        },
        {
            label: "resolution",
            id: document.getElementById('form-resolution'),
            group: document.getElementById("resolution-group"),
        },
    ];
    let csrNotes = ``;

    for (i = 0; i < items.length; i++){
        if (items[i].group.classList.contains('display-none') == false){
            if (items[i].id.value != ""){
                csrNotes += `${items[i].label}: ${items[i].id.value} // `
            }
        }
    }
    if (document.getElementById('form-product').value == "form-vm"){
        let newNote = `GTL/${document.getElementById('form-rep').value} - ${csrNotes}`;
        csrNotes = newNote;
    } else if (document.getElementById('form-product').value == "form-go"){
        csrNotes = `as per ${items[1].id.value}, ${items[4].id.value} - ${generateRepInitials()} ${generateDate()}`;
    } else {
        // do nothing for cn
    }

    return csrNotes;
}

function generateDate(){
    // grabs the date
    const d = new Date();
    let dMonth = d.getMonth() + 1;
    let dDay = d.getDate();
    let dYear = d.getFullYear();

    if (dMonth < 10){
        dMonth = `0${dMonth}`;
    }
    if (dDay < 10){
        dDay = `0${dDay}`;
    }
    let mmddyyyy = `${dMonth}/${dDay}/${dYear}`;
    
    return mmddyyyy;
};

function generateRepInitials(){
    let csrName = document.getElementById('form-rep').value;
    if (csrName != ""){
        // check if the rep entered their name, if so, we need to get the initials of it
        let firstLetter = "";
        let secondLetter = "";

        for (i = 0; i < csrName.length; i++){
            if (i == 0){
                firstLetter = csrName[i];
            } else if (csrName[i] == " "){
                let j = i+1;
                secondLetter = csrName[j];
            }
        }
        return `${firstLetter}.${secondLetter}`
    }    
};

function copyStr(str){
    // creates a temporary text area
    let tempDump = document.createElement('textarea');

    // sets the value of it to the str we need
    tempDump.value = str;

    // make it read only
    tempDump.setAttribute('readonly', '');

    // add an ID
    tempDump.setAttribute('id', 'delete-me')

    // put it somewhere we can't see it
    tempDump.style = {position: 'absolute', left: '-9999px'};

    // add it to the document
    document.body.appendChild(tempDump);

    // select the contents of the text area
    tempDump.select();

    // copy it
    document.execCommand('copy');

    // delete it
    document.getElementById('delete-me').remove();
}

// production selection
function updatePage(){
    // links
    const defaultLinks = [
        {
            title: `ADP`,
            url: `https://workforcenow.adp.com/portal/theme`
        },
        {
            title: `InContact`,
            url: `https://inlogin.incontact.com/inContact/Login.aspx?ReturnUrl=%2f`
        },
        {
            title: `Okta`,
            url: `https://gtl.okta.com/`
        },
    ];
    const cnLinks = [
        {
            title: `CN`,
            url: `https://web.connectnetwork.com/`
        },
        {
            title: 'hCARES',
            url: 'hcares/CARES/Default.aspx',
        },
        {
            title: 'dCARES',
            url: 'dcares/CARES/Default.aspx',
        },
        {
            title: 'Command',
            url: 'https://ca.gtl.us/Modules/Home/',
        },
        {
            title: 'SSO',
            url: 'https://sso.gtlconnect.com/manage/users/',
        },
    ];
    const vmLinks = [
        {
            title: 'VisitMe',
            url: 'https://www.gtlvisitme.com/app',
        },
        {
            title: 'Facilities',
            url: 'https://confluence.gtl.net/display/VMFL/VM+Facility+List',
        },
    ];
    const goLinks = [
        {
            title: `GO`,
            url: `http://www.gettingout.com/`
        },
        {
            title: 'Secure1',
            url: 'https://www.intelmate.net/kiosk/home',
        },
        {
            title: 'Secure2',
            url: 'https://secure2.intelmate.com/kiosk/home',
        },
        {
            title: 'Visit',
            url: 'https://command-center.telmate.com/ui#/main',
        },
        {
            title: 'Moneygram',
            url: 'https://online.moneygram.com/ExpressPaymentIPN/expressPaymentLogin.do',
        },
        {
            title: 'SSO',
            url: 'https://sso.gtlconnect.com/manage/users/',
        },
    ];

    function updateList(array1, array2=defaultLinks, id="work-links"){
        let elm = document.getElementById(id);
        let temp = ``;

        // add the default links
        if (array2 != 'none'){
            for (i = 0; i < array2.length; i++){
                temp += `<li><a href="${array2[i].url}" target="_blank">${array2[i].title}</a></li>`;
            }
        }

        // add the facility specific ones
        for (i = 0; i < array1.length; i++){
            temp += `<li><a href="${array1[i].url}" target="_blank">${array1[i].title}</a></li>`;
        }

        // add the menu options
        temp += `<li><a href="#" id="aside-content-menu-btn">Menu</a></li>`;
        elm.innerHTML = temp;
    }

    // logo
    const logo = document.getElementById('header-logo');

    //check what it was changed to
    const ELM = document.getElementById('form-product');

    // issue datalist
    const issueList = document.getElementById('issue-list');
    const cnIssues = [
        {
            issue: `apoc`,
            links: `<li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=91620448" target="_blank">One Call Solutions</a></li>`,
        },
        {
            issue: `account setup`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-CPNI+%28Customer+Proprietary+Network+Information%29+Verification" target="_blank">CPNI</a></li><li><a href="https://confluence.gtl.net/display/CALL/CN-CARES+Account+Identification" target="_blank">Setup Instructions</a></li>`,
        },
        {
            issue: `auto reload`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-Auto+Reload" target="_blank">Auto Reload</a></li>`,
        },
        {
            issue: `call blocks`,
            links: `<li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=96011340" target="_blank">Add Blocks</a></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Blocked+Calls" target="_blank">Remove Blocks</a></li>`,
        },
        /*{
            issue: `call credit`,
            links: `<li><a href="" target="_blank"></a></li>`,
        },*/
        {
            issue: `call connection issues`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-LEC+Billing" target="_blank">LEC/Billing</a></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Call+Connection+Issues" target="_blank">Connection Troubleshooting</a></li>`,
        },
        {
            issue: `chargebacks/fraud/gfunds`,
            links: `<li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=91620614" target="_blank">Chargebacks/Fraud/G-Funds</a></li>`,
        },
        {
            issue: `direct bill/attorney`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-Direct+Bill" target="_blank">Direct Bill Customer</a></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Attorney+Calls" target="_blank">Attorney Calls</a></li>`,
        },
        {
            issue: `expired funds/write-offs`,
            links: `<li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=91620415" target="_blank">Expired Funds/Write-Offs</a></li>`,
        },
        {
            issue: `funds transfer`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-Funds+Transfer" target="_blank">Funds Transfer</a></li>`,
        },
        {
            issue: `inmate issues`,
            links: `<li><strong>Most inmate issues must be reported by the inmate within the facility</strong></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Trust+Fund" target="_blank">Trust Fund</a><li><a href="https://confluence.gtl.net/display/CALL/CN-Research+Tickets" target="_blank">PIN Debit Refund (upon inmate's release)</a></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Unlocking+Tablets" target="_blank">Tablet Reset</a></li>`,
        },
        {
            issue: `missing payment`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-Missing+Payments" target="_blank">Missing Payment</a><li><a href="https://confluence.gtl.net/display/CALL/CN-Research+Tickets" target="_blank">Templates</a>`
        },
        {
            issue: `payment/balance`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-Payment+Methods" target="_blank">Payment Methods</a></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Trust+Fund" target="_blank">Trust Fund</a></li></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Payment+Declines" target="_blank">Payment Declines</a></li>`,
        },
        {
            issue: `rates`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-Rates" target="_blank">Rates</a></li>`,
        },
        {
            issue: `refund/account closure`,
            links: `<li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=91621664" target="_blank">Refund/Account Closure</a></li>`,
        },
        {
            issue: `website/app`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/CN-Connect+Network+Messaging" target="_blank">Messaging</a></li><li><a href="https://confluence.gtl.net/display/CALL/CN-Connect+Network+Account+Setup" target="_blank">CN Account Setup</a><li><a href="https://confluence.gtl.net/display/CALL/CN-Video+Visitation" target="_blank">Video Visitation</a></li></li>`,
        },
    ];

    const goIssues = [
        {
            issue: `bail`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/GO-Bail+Out" target="_blank">Bail Out</a></li>`,
        },
        {
            issue: `blocks`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/GO-Blocks" target="_blank">Blocks</a></li><li><a href="https://confluence.gtl.net/display/CALL/Blocks+-+Canada" target="_blank">Canada Blocks</a></li>`,
        },
        /*{
            issue: `call connection issues`,
            links: `<li><a href="" target="_blank"></a></li>`,
        },*/
        {
            issue: `canada account`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/GO-Canada+Accounts" target="_blank">Canada Account</a></li>`,
        },
        {
            issue: `fraud`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/GO-Fraud+Flag" target="_blank">Fraud Flag</a></li>`,
        },
        {
            issue: `payment`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/GO-Types+of+Payments" target="_blank">Types of Payments</a><li><a href="https://confluence.gtl.net/display/CALL/GO-Large+Dollar+Transaction" target="_blank">Large Deposit</a></li></li><li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=92931286" target="_blank">Offender Deposits</a></li><li><a href="https://confluence.gtl.net/display/CALL/Deposits" target="_blank">Canada Deposit</a><li><a href="https://confluence.gtl.net/display/CALL/Call+Bundles+-+Canada" target="_blank">Call Bundles</a></li></li>`,
        },
        /*{
            issue: `missing payment`,
            links: `<li><a href="" target="_blank"></a></li>`,
        },*/
        {
            issue: `refund`,
            links: `<li><a href="" target="_blank"></a></li><li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=93587376" target="_blank">Canada Refund (Destination)</a></li><li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=93587381" target="_blank">Canada Refund (Offender)</a></li>`,
        },
        {
            issue: `verification`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/GO-Account+Verification" target="_blank">Account Verification</a></li><li><a href="https://confluence.gtl.net/display/CALL/GO-Verification+Process+Received+Via+Email" target="_blank">Verification via Email</a></li>`,
        },
        {
            issue: `video visitation`,
            links: `<li><a href="https://confluence.gtl.net/display/CALL/GO-Tablet+Facilities" target="_blank">Tablet Visit</a></li><li><a href="https://confluence.gtl.net/display/CALL/GO-T-Phone+Visit+Facilities" target="_blank"></a>T-Phone</li><li><a href="https://confluence.gtl.net/display/CALL/GO-Visit+Now" target="_blank">Visit Now</a></li><li><a href="https://confluence.gtl.net/display/CALL/GO-Troubleshooting" target="_blank">Troubleshooting</a></li>`,
        },
        {
            issue: `website/app`,
            links: `<li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=91621381" target="_blank">Online Account</a></li><li><a href="https://confluence.gtl.net/display/CALL/GO-Mobile+Apps" target="_blank">Apps</a></li><li><a href="https://confluence.gtl.net/display/CALL/GO-Messaging" target="_blank">Messaging</a></li>`,
        },
        /*{
            issue: ``,
            links: `<li><a href="" target="_blank"></a></li>`,
        },*/
    ]

    let tempIssues = "";
    let facList = ``;
    if (ELM.value == 'form-cn'){
        //logo.src = "https://web.connectnetwork.com/wp-content/themes/iron-framework-child/images/gtl-logo-2017-mobile.gif";
        setStyle('cnColor');
        updateList(cnLinks);

        // facility datalist
        facList = generateOptions(cnFacs);

        //populate the datalist
        for (i = 0; i < cnIssues.length; i++){
            tempIssues += `<option value="${cnIssues[i].issue}"/>`;
        }

        //customize note form
        document.getElementById('inmate-group').classList.add('display-none');
        document.getElementById('passcode-group').classList.remove('display-none');
    } else if (ELM.value == 'form-go'){
        //logo.src = "GTL-GO-Logo-494x122.png";
        setStyle('goColor');
        updateList(goLinks);
        // populate the datalist
        for (i = 0; i < goIssues.length; i++){
            tempIssues += `<option value="${goIssues[i].issue}"/>`;
        }
        facList = generateOptions(goFacs);

        //customize note form
        document.getElementById('inmate-group').classList.remove('display-none');
        document.getElementById('passcode-group').classList.add('display-none');
    } else {
        //logo.src = "https://www.gtlvisitme.com/images/gtl_visitme.png";
        setStyle('vmColor');
        updateList(vmLinks);
        // populate the datalist
        tempIssues = "";

        // facility datalist
        facList = generateOptions(vmFacs);

        //customize note form
        document.getElementById('inmate-group').classList.remove('display-none');
        document.getElementById('passcode-group').classList.add('display-none');
    }
    document.getElementById('fac-list').innerHTML = facList;
    issueList.innerHTML = tempIssues;
   const issueElm = document.getElementById('form-issue');

    function dynamicIssue(){
        if (document.body.contains(document.getElementById('dynamic-help')) == true){
            const helpDump = document.getElementById('dynamic-help');
            // if the dynamic help page exists...
            if (ELM.value == "form-cn"){
                for (i = 0; i < cnIssues.length; i++){
                    if (issueElm.value == cnIssues[i].issue){
                        helpDump.innerHTML = cnIssues[i].links;
                    }
                }
            } else if (ELM.value == "form-go"){
                for (i = 0; i < goIssues.length; i++){
                    if (issueElm.value == goIssues[i].issue){
                        helpDump.innerHTML = goIssues[i].links;
                    }
                }
            } else {
                // VisManager
                helpDump.innerHTML = `
                    <li><a href="https://confluence.gtl.net/display/VMFL/VM+Facility+List" target="_blank">Facility List</a></li>
                    <li><a href="https://confluence.gtl.net/pages/viewpage.action?pageId=92935489" target="_blank">All Issues</a></li>
                `;
            }
        }
    }
   
   issueElm.removeEventListener('input', alert);
   issueElm.addEventListener('input', dynamicIssue, false);

    updateInfo();
}

document.getElementById('form-product').addEventListener('change', updatePage);

function setColor(id){
    let currTheme = document.getElementById('form-product');
    let sameTheme = false;
    
    let color = document.getElementById(id);
    if (id == 'go-picker'){
        goColor = color.value;
        localStorage.setItem('goColor', color.value);
        if (currTheme.value == "form-go"){
            sameTheme = true;
        }
    } else if (id == 'cn-picker'){

        cnColor = color.value;
        localStorage.setItem('cnColor', color.value);
        if (currTheme.value == "form-cn"){
            sameTheme = true;
        }
    } else {
        vmColor = color.value;
        localStorage.setItem('vmColor', color.value);
        if (currTheme.value == "form-vm"){
            sameTheme = true;
        }
    }

    if (sameTheme == true){
        setStyle(color.value);
    }
}

// info menu
function updateInfo(){
    // info array
    let info = [ 
        {
            name: `Scratch Pad`,
            id: 'scratchpad',
            product: `all`,
            checked: true,
            info: `<textarea class="scratchpad" id="scratchpad" placeholder="text here will not reset when you reset your notes.  you can use it for additional notes."></textarea>`,
        },
        {
            name: `Confluence Links`,
            id: 'confluencelinks',
            product: `all`,
            checked: true,
            info: `<p>Links relevent to your selected issue will populate below.  Alternatively, you can view Confluence by clicking <a href="https://confluence.gtl.net/display/CALL/Training+Center+of+Excellence" target="_blank">here</a>.  If the page states that you are unauthorized, please open Confluence through the Okta button above to resolve the issue.</p><ul id="dynamic-help"></ul>`,
        },
        {
            name: `Theme Picker`,
            id: 'themepicker',
            product: `all`,
            checked: false,
            info: `<ul><li>CN Theme: <input onChange="setColor('cn-picker')" id="cn-picker" type="color" value="${cnColor}"></li><li>GO Theme: <input type="color" id="go-picker" onChange="setColor('go-picker')" value="${goColor}"></li><li>VM Theme: <input type="color" onChange="setColor('vm-picker')" id="vm-picker" value="${vmColor}"></li></ul> <button type="button" class="center" onclick="clearStorage('themes')">Reset Defaults</button>`,
        },
        {
            name: `Contact Numbers`,
            id: 'contactnumbers',
            product: `all`,
            checked: false,
            info: `<ul class="list"><li><strong>ConnectNetwork:</strong> 800-483-8314</li><li><strong>GettingOut:</strong> 866-516-0115</li><li><strong>GO Canada:</strong> 866-713-4761</li><li><strong>VisManager:</strong> 855-208-7349</li><li><strong>VAC:</strong> 800-786-8521</li><li><strong>CN Facility Support:</strong> 800-646-6283</li><li><strong>CN Fax:</strong> 1-866-262-9123</li></ul>`,
        },
        {
            name: `Opening Script`,
            id: 'openingscript',
            product: `all`,
            checked: false,
            info: `<ul class="list"><li>Thank you for calling Customer Service. My name is ${generateFirstName()}.</li><li>May I have your phone number starting with the area code first, please?</li><li>How may I help you today?</li></ul>`,
        },
        {
            name: `Closing Script`,
            id: 'closingscript',
            product: `all`,
            checked: false,
            info: `<ul class="list"><li>Thank you for calling Customer Service. Goodbye.</li></ul>`,
        },
        {
            name: `CPNI`,
            product: `cn`,
            checked: false,
            info: `<p>To pass CPNI, the customer needs to correct answer 3 of the questions below (2 if they are calling from the account number).  You can only perform CPNI for the owner of the phone.</p><ul class="list"><li>The complete address on file</li><li>The name of the last facility that called</li><li>The date of the last call</li><li>The amount of the last payment</li><li>The date of the last payment</li><li>The last 4 numbers of the last card used</li></ul>`,
        },
        {
            name: `CPNI`,
            product: `go`,
            checked: false,
            info: `<p>Prior to accessing the customer's account for SNAP, the CSR will need to verify 2 of the 4 security questions below:</p><ul class="list"><li>Date of Birth</li><li>Email Address</li><li>Address listed on government issued ID</li><li>Last 4 of SSN</li></ul>`,
        },
        {
            name: `CPNI`,
            product: `vm`,
            checked: false,
            info: `<p>Prior to assisting a visitor with his/her account (troubleshooting, scheduling, password reset, etc), the CSR must correctly verify any 4 of the following information:</p><ul class="list"><li>Facility Inmate is Located</li><li>Name of visitor</li><li>Date of Birth</li><li>Address</li><li>Driver's License (ID) Number</li><li>Email Address</li><li>Phone Number</li><li>Date of Last Visit</li></ul>`,
        },
        /*{
            name: `VM Test`,
            product: `vm`,
            checked: false,
            info: `This is a test option for when VisManager is selected.`,
        },*/
    ];
    
    // LOCAL STORAGE

    if (localStorage.length > 0){
        // we have storage items, so we should load them
        let checks = [
            'scratchpad',
            'confluencelinks',
            'themepicker',
            'contactnumbers',
            'openingscript',
            'closingscript',
        ];

        let themes = [
            'cnColor',
            'goColor',
            'vmColor',
        ]

        /*
            Items to load:
            1. Rep name
            2. Rep checkboxes
            3. Rep color scheme
        */

        for (let i = 0; i < localStorage.length; i++){
            if (localStorage.key(i) == "rep"){
                // set the rep name
                document.getElementById('form-rep').value = localStorage.getItem("rep");
            } else if (checks.includes(localStorage.key(i))){
                // cycle through the info array and set the check items
                for (let j = 0; j < info.length; j++){
                    if (info[j].id == localStorage.key(i)){
                        if (localStorage.getItem(localStorage.key(i)) == "true"){
                            info[j].checked = true;
                        } else {
                            info[j].checked = false;
                        }
                    }
                }
            } else if (themes.includes(localStorage.key(i))){
                // set the themes
                if (localStorage.key(i) == 'cnColor'){
                    cnColor = localStorage.getItem('cnColor');
                } else if (localStorage.key(i) == 'goColor'){
                    goColor = localStorage.getItem('goColor');
                } else{
                    vmColor = localStorage.getItem('vmColor');
                }
            }
        }
    }

// ***
    
    // html elements
    const menuBtn = document.getElementById('aside-content-menu-btn');
    const menuDump = document.getElementById('aside-content-menu-options');
    const menuContainer = document.getElementById('aside-menu-container');
    const dump = document.getElementById('aside-content-container');

    // populate the menu options
    let content = ``;
    for (i = 0; i < info.length; i++){
        if (info[i].name != ''){ // skip blanks
            if (`form-${info[i].product}` == document.getElementById('form-product').value || info[i].product == 'all'){ // make sure only relevant ones show
                content += `<li><label>${info[i].name}: </label><input type="checkbox" class="info-options" id="check-${i}"></li>`;
            }
        }
    }
    
    // add the options to the drop-down menu
    menuDump.innerHTML = content;

    // toggle the menu on/off
    menuBtn.addEventListener('click', ()=>{
        menuContainer.classList.toggle('display-none');
    });
    
    // makes the stuff appear in the side menu
    let preDump = "";
    function populateDump(){
        if (document.body.contains(document.getElementById('scratchpad'))){
           preDump = document.getElementById('scratchpad').value;
        }
        let checkedDump = ``;
        for (i = 0; i < info.length; i++){
            if (info[i].checked == true || info[i].checked == "true"){
                checkedDump += `<div class="aside-content-group"><fieldset><legend id="${i}" class="legend-btn"><em>${info[i].name}</em></legend>${info[i].info}</fieldset></div>`;
            }
        }
        dump.innerHTML = checkedDump;
        if (document.body.contains(document.getElementById('scratchpad'))){
            document.getElementById('scratchpad').value = preDump;
        }

        if (dump.innerHTML == ""){
            // if it's empty, give it a display none
            dump.classList.add('display-none');
            // make the left form wide
            document.querySelector('.split-left').classList.add('max-width');
        } else {
            // undo the if, if it doesn't apply
            dump.classList.remove('display-none');
            document.querySelector('.split-left').classList.remove('max-width');
        }

        // makes them disappear when clicked
        document.querySelectorAll('.legend-btn').forEach((item) =>{
            item.addEventListener('click', ()=>{
                info[item.id].checked = false;
                document.getElementById(`check-${item.id}`).checked = false;
                localStorage.setItem(`${info[item.id].id}`, 'false');
                populateDump();
            });
        });
    }

    // add the info
    const checkboxes = document.querySelectorAll('.info-options');
    checkboxes.forEach((checkbox) =>{
        let checkboxStr = checkbox.id
        let index = checkboxStr.slice(-1);
        checkbox.checked = info[index].checked;

        checkbox.addEventListener('change', ()=>{
            if (checkbox.checked == true || checkbox.checked == "true"){
                info[index].checked = true;
                localStorage.setItem(`${info[index].id}`, 'true');
            } else {
                info[index].checked = false;
                localStorage.setItem(`${info[index].id}`, 'false');
            }
            populateDump();
            if (document.body.contains(document.getElementById('cn-picker'))){
                // set color defaults
                document.getElementById('cn-picker').value = cnColor;
                document.getElementById('go-picker').value = goColor;
                document.getElementById('vm-picker').value = vmColor;
            }
        });
    });
    let currTheme = document.getElementById('form-product').value
    let dumpColor = "vmColor";
    if (currTheme == "form-cn"){
        dumpColor = "cnColor";
    } else if (currTheme == "form-go"){
        dumpColor = "goColor";
    }
    setStyle(dumpColor);
    populateDump();
}

// close button
document.getElementById('aside-menu-close').addEventListener('click', ()=>{
    document.getElementById('aside-menu-container').classList.toggle('display-none');
});

// reset button
document.getElementById('form-reset').addEventListener('click', ()=>{
    let e = confirm('Are you sure you wish to reset your notes?');
    if (e == true){
        document.getElementById('form-number').value = "";
        document.getElementById('form-customer').value = "";
        document.getElementById('form-facility').value = "";
        document.getElementById('form-inmate').value = "";
        document.getElementById('form-issue').value = "";
        document.getElementById('form-resolution').value = "";
    };
});

// copy button
document.getElementById('form-copy').addEventListener('click', (e)=>{
    const popupDiv = document.getElementById('popup-div');
    popupDiv.style.top = e.clientY+"px";
    popupDiv.style.left = e.clientX+"px";

    if (!popupDiv.classList.contains('fadeout')){
        popupDiv.classList.remove('hidden');
        popupDiv.classList.add('fadeout');

        const timeOut = setTimeout(function(){
            popupDiv.classList.add('hidden');
            popupDiv.classList.remove('fadeout');
        }, 2000);
    }
    copyStr(generateNotes().replace(/(’|–|“|”)/g, '')); // removes fancy characters
});

// live notes
/* document.querySelectorAll('.form-group input').forEach((item) => {
    item.value = 'meow';
    item.addEventListener('click', ()=>{
        if (document.getElementById('live-notes') == true){
            let liveDump = document.getElementById('live-notes');
            liveDump.value = generateNotes();
        }
    });
}); */

function generateOptions(array){
    let result = ``;
    for (i = 0; i < array.length; i++){
        result += `<option value="${array[i]}"/>`
    }
    return result;
}

const cnFacs = ["Baldwin County AL-Corrections Center","Birmingham AL-City Jail","Fairhope AL – City Jail","Federal Bureau of Prisons AL-Aliceville FCC","Federal Bureau of Prisons AL-Montgomery FPC","Federal Bureau of Prisons AL-Talladega FCI","GEO CARES AL Therapeutic Education Facility","Jefferson County, AL – G. Ross Bell Youth Detention Center","Madison County AL-Detention Facility","Mobile County AL-Metro Jail","Mobile County AL-Strickland Youth Center","Tallapoosa County AL-Jail","Federal Bureau of Prisons AR-Forrest City FCC","Apache Junction AZ-City Detention Unit","Arizona Department of Corrections","Avondale AZ-City Detention Facility","Federal Bureau of Prisons AZ-Phoenix FCI","Federal Bureau of Prisons AZ-Safford FCI","Federal Bureau of Prisons AZ-Tucson FCC","Gila County AZ","Glendale AZ-City Jail","Maricopa County AZ – Durango Detention Center (DDC)","Maricopa County AZ – Towers Jail","Maricopa County AZ – Watkins Jail","Maricopa County AZ-4th Avenue Jail","Maricopa County AZ-Estrella Jail","Maricopa County AZ-Lower Buckeye Jail","Mesa AZ-City Holding Facility","Pima County AZ","Alameda County CA-Juvenile Justice","Alameda County, CA","California Department of Corrections","Contra Costa County Sheriffs Office, CA","Federal Bureau of Prisons CA-Atwater USP","Federal Bureau of Prisons CA-Dublin FCI","Federal Bureau of Prisons CA-Herlong FCI","Federal Bureau of Prisons CA-Lompoc FCC","Federal Bureau of Prisons CA-Los Angeles MDC","Federal Bureau of Prisons CA-Mendota FCI","Federal Bureau of Prisons CA-San Diego MCC","Federal Bureau of Prisons CA-Terminal Island FCI","Federal Bureau of Prisons CA-Victorville FCC","Fresno County Jail (ID 21134)","Glenn County CA-Jail","Los Angeles County CA","Marin County CA-County Jail","Merced County CA","Merced County CA-Juvenile Justice Complex","Orange County CA","Patton State Hospital CA","San Benito County CA-Jail","San Bernardino County Juvenile CA","San Francisco County CA","San Luis Obispo County CA-Jail","San Mateo County CA","Santa Ana, CA City Jail","Santa Clara County CA","Shasta County CA-Main Jail","Solano County CA","Solano County CA-Juvenile","Sonoma County Adult Detention",
"Sonoma County CA-Juvenile Justice Center","Stanislaus County CA","Tulare County – Bob Wiley Correctional CA","USNCA-USMC Camp Pendleton Brig","USNCA-USMC Miramar NAVCONBRIG","Yuba County CA-Jail","Arapahoe County CO","Colorado Department of Corrections","Colorado Dept. of Youth Corrections-Adams","Colorado Dept. of Youth Corrections-Gilliam","Colorado Dept. of Youth Corrections-Grand Mesa","Colorado Dept. of Youth Corrections-Lookout Mtn.","Colorado Dept. of Youth Corrections-Marvin Foote","Colorado Dept. of Youth Corrections-Mount View","Colorado Dept. of Youth Corrections-Platte Valley","Colorado Dept. of Youth Corrections-Pueblo","Colorado Dept. of Youth Corrections-Spring Creek","Colorado Dept. of Youth Corrections-State Hospital","Colorado Dept. of Youth Corrections-Zebulon Pike","El Paso County CO","Federal Bureau of Prisons CO-Englewood FCI","Federal Bureau of Prisons CO-Florence FCC","Larimer County Jail Detention Center, CO","Federal Bureau of Prisons CT-Danbury FCI","Washington DC-CDF DC Jail","Delaware Department of Correction","Bay County Jail","Brevard County FL","Charlotte County FL","Collier County FL","Duval County FL","Escambia County FL","Federal Bureau of Prisons FL-Coleman FCC","Federal Bureau of Prisons FL-Marianna FCI","Federal Bureau of Prisons FL-Miami FCI","Federal Bureau of Prisons FL-Miami FDC","Federal Bureau of Prisons FL-Pensacola FPC","Federal Bureau of Prisons FL-Tallahassee FCI","Florida Department of Corrections","GEO Group FL DMS-Blackwater River Facility","GEO Group FL-Bay Correctional Facility","GEO Group FL-Graceville Correctional","GEO Group FL-Moore Haven Correctional","Glades County Jail, FL","Highlands County FL","Hillsborough County FL","Indian River County FL-County","Lee County FL","Manatee County FL","Martin County FL","Miami-Dade County FL","Orange County FL","Palm Beach County FL","Pinellas County FL","Putnam County FL","Santa Rosa County FL","Sarasota County FL","St. Lucie County FL","Union County FL","Walton County FL – County Jail","Acworth GA-Detention Center (Site ID 9294)","CCA GA-McRae Correctional Facility","Cobb County GA","East Point GA-Law Enforcement Center",
"Federal Bureau of Prisons GA-Atlanta USP","Federal Bureau of Prisons GA-Jesup FCI","GEO Group GA-D. Ray James Prison (BOP)","GEO Group GA-R. A. Deyton Detention","Federal Bureau of Prisons Honolulu HI FDC","HI DPS-All Dept. of Public Safety","USNHI-USN Pearl Harbor Brig","Black Hawk County IA","Iowa DHS-Eldora Training School for Boys","Scott County IA","Cook County, IL Department of Corrections","DuPage County Jail – Illinois","Federal Bureau of Prisons / FCI Greenville – Illinois","Federal Bureau of Prisons / MCC Chicago – Illinois","Federal Bureau of Prisons / Pekin Federal Prison – Illinois","Federal Bureau of Prisons / Thomson Correctional Center – Illinois","Federal Bureau of Prisons / USP Marion – Illinois","Illinois Department of Corrections","Lake County IL – Adult Corrections (AU01)","Peoria County Jail – Illinois","Rock Island County Jail","Winnebago County Jail / Justice Center – Illinois",
"Winnebago Juvenile Center – Illinois","Allen County IN","Allen County IN – Community Corrections","Duvall Residential Center","Federal Bureau of Prisons IN-Terre Haute FCC","Howard County IN-County Jail","Indiana Department of Corrections","Madison County IN","Marion County IN","Marion County IN-(CCA)","Morgan County IN","St. Joseph County IN-County Jail","Tippecanoe County IN-County Jail","AAFES KS-Fort Leavenworth JRCF","AAFES KS-Fort Leavenworth USDB","Federal Bureau of Prisons KS-Leavenworth USP","Johnson County KS","Riley County KS-Jail","Campbell County KY","Federal Bureau of Prisons KY-Ashland FCI","Federal Bureau of Prisons KY-Big Sandy USP","Federal Bureau of Prisons KY-Lexington FMC","Federal Bureau of Prisons KY-Manchester FCI","Federal Bureau of Prisons KY-McCreary USP","Bayouview Correctional Center LA Jail","Federal Bureau of Prisons LA-Oakdale FCC","Federal Bureau of Prisons LA-Pollock FCC","Ouachita Parish LA-Correctional Center","Essex County MA-House of Correction","Federal Bureau of Prisons MA-Devens FMC","Norfolk County MA-Correctional","Caroline County MD-Prison","Carroll County MD- Jail","Federal Bureau of Prisons MD-Cumberland FCI","Harford County MD-Detention Center","Maryland Department of Corrections","Maryland Department of Juvenile Services","Prince Georges County MD-Correctional","Washington County MD","Wicomico County MD – Detention Center","Aroostook County ME-Jail","Maine Department of Corrections","Somerset County ME-Jail",
"Two Bridges Regional ME-Jail","Berrien County MI-Jail","Detroit MI-Detention Center","Federal Bureau of Prisons MI-Milan FCI","Genesee County MI – Jail","GEO Group MI – Northlake Correctional Facility","Hillsdale County MI-Jail","Lenawee County MI-Jail","Michigan Department of Corrections","Muskegon County MI","Oak Park MI-City Jail","Washtenaw County MI","Federal Bureau of Prisons MN-Duluth FPC","Federal Bureau of Prisons MN-Rochester FMC","Federal Bureau of Prisons MN-Sandstone FCI","Federal Bureau of Prisons MN-Waseca FCI","Hennepin County MN","Houston County MN","Minnesota Department of Corrections","Nobles County MN","Ramsey County MN","Federal Bureau of Prisons MO-Springfield MCFP","Alcorn County MS-Regional Jail","Alcorn County MS-Regional Jail Juvenile","Bolivar County MS-Correctional Facility","Federal Bureau of Prisons MS-Yazoo City FCC","George-Greene Cnty MS-Regional Jail","Hinds County MS","Jefferson-Franklin County MS-Regional Jail","Lawrence County MS-Jail","Mississippi Department of Corrections","Pontotoc County MS-Detention Center","Rankin County MS","Wilkinson County MS-Jail","Buncombe County NC","Cabarrus County NC","Cumberland County NC-Detention Center","Davidson County NC","Durham County NC-Detention Facility","Federal Bureau of Prisons NC-Butner FCC","GEO Group NC-Rivers Correctional","Mecklenburg County NC","Moore County NC","North Carolina Department of Corrections","Wilkes County NC","Buffalo County NE","Douglas County NE-Jail","Douglas County NE-Youth Center","Lancaster County NE","Nebraska Department of Corrections","Federal Bureau of Prisons NH-Berlin FCI","New Hampshire DOC","Strafford County NH-Correctional",
"Atlantic County NJ-Justice Center","Bergen County NJ-Prison","Burlington County NJ-Detention Center","Camden County NJ-Correctional Facility","CEC NJ-Bo Robinson Center","CEC NJ-Delaney Hall","CEC NJ-Talbot Hall","CEC NJ-Tully House","Cumberland County NJ-County Jail","Essex County NJ-Correctional Facility","Essex County NJ-Juvenile Detention","Federal Bureau of Prisons NJ-Fairton FCI","Federal Bureau of Prisons NJ-Fort Dix FCI","Hudson County NJ","Mercer County NJ-Correction Center","Middlesex County NJ-Adult Correctional","Middlesex County NJ-Juvenile Detention","Monmouth County NJ-County Prison","Morris County NJ-County Jail","New Jersey Department of Corrections","New Jersey Juvenile Justice","Ocean County NJ-County Jail","Passaic County NJ","Salem County NJ-Correctional Facility","Somerset County NJ-County Jail","Sussex County NJ-Keogh-Dwyer Correctional","Union County NJ","Warren County NJ-Correctional","Bernalillo County Metro Detention Center","Bernalillo County Youth Services Center","Dona Ana County Detention Center","Luna County NM-Detention Center","San Juan County NM – Adult Detention Center","San Juan County NM – Alternative Sentencing Facility","Clark County NV","Allegany County NY-County Jail","Broome County NY-County Jail","Cattaraugus County NY-County Jail","Cayuga County NY-County Jail",
"Chautauqua County NY-County Jail","Chemung County NY-Jail","Chenango County NY-County Jail","Clinton County NY-County Jail","Columbia County NY-County Jail","Cortland County NY-County Jail","Delaware County NY-County Jail","Dutchess County NY-County Jail","Essex County NY-County Jail","Federal Bureau of Prisons NY-Brooklyn MDC","Federal Bureau of Prisons NY-New York MCC","Federal Bureau of Prisons NY-Otisville FCI","Federal Bureau of Prisons NY-Ray Brook FCI","Franklin County NY-County Jail","Fulton County NY-County Jail","GEO Group NY-Queens Detention Facility","Greene County NY-County Jail","Herkimer County NY-County Jail","Jefferson County NY-County Jail","Lewis County NY-County Jail (LCO)","Livingston County NY-County Jail","Madison County NY-County Jail","Montgomery County NY-County Jail","Nassau County NY-Correctional Center","Niagara County NY-County Jail","Oneida County NY-County Jail","Orange County NY-County Jail","Oswego County NY-County Jail","Otsego County NY-County Jail","Putnam County NY-County Jail","Rensselaer County NY-County Jail","Saratoga County NY-County Jail","Schenectady County NY-County Jail","Schoharie County NY – County Jail","Schuyler County NY-County Jail","Seneca County NY-County Jail","St. Lawrence County NY-County Jail","Steuben County NY-County Jail","Sullivan County NY-County Jail","Tioga County NY-County Jail","Tompkins County NY-County Jail","Warren County NY-County Jail","Washington County NY-County Jail","Wayne County NY-County Jail","Westchester Cnty NY-County Jail","Wyoming County NY-County Jail","Yates County NY-County Jail","Brook Park OH-City Jail","CCA OH-Northeast Ohio Correctional (ICE)","CCA OH-Northeast Ohio Correctional (USM)","CCNO – Regional Corrections Center of Northwest Ohio","East Cleveland OH-City Jail","Federal Bureau of Prisons OH-Elkton FCI","Franklin County OH","Lake County OH-Adult Detention","Lakewood OH-City Jail","Lucas County OH",
"Mahoning County OH-Juvenile Center","Montgomery County OH-MonDay","OHCBCF-SEPTA Correctional Facility","Ohio Department of Rehabilitation and Corrections","Ohio Department of Youth Services","Parma Heights OH-City Jail","Richmond Heights OH-City Jail","Solon OH-City Jail","Stark County OH-Regional Corrections","Trumbull County OH-Jail","Trumbull County OH-Juvenile","Westlake OH-City Jail","Zanesville OH-City Jail","CCA OK-Cimarron Correctional","Federal Bureau of Prisons OK-El Reno FCI","Federal Bureau of Prisons OK-Oklahoma City FTC","GEO Group OK-Great Plains Correctional","GEO Group OK-Lawton Correctional","Clackamas County OR","Columbia County OR-Jail","Federal Bureau of Prisons OR-Sheridan FCI","Jackson County Justice Transition Center","Jackson County-OR Jail","Warm Springs OR-Tribal Jail","Yamhill County OR-Jail","Adams County PA-Adult Correctional Complex","Allegheny County PA-Jail","Allegheny County PA-Shuman JDC","Armstrong County PA-Jail","Beaver County PA-Jail","Berks County PA-Jail","Bradford County PA-Correctional Facility","Bucks County PA","Bucks County PA-House Arrest","Bucks County PA-Youth Facility","Cambria County PA-Prison","Carbon County PA-Correctional","CECPA-Hoffman Hall","CECPA-Joseph E Coleman Center","Centre County PA-Correctional","Chester County PA-Prison","City of Philadelphia PA","Clarion County PA-Correctional Facility","Clearfield County PA-Prison","Cumberland County PA-Prison","Dauphin County PA-Prison","Dauphin County PA-Work Release Center","Delaware County PA-Correctional Facility","Delaware County PA-Juvenile Detention","Fayette County PA-Jail","Federal Bureau of Prisons PA-Allenwood USP","Federal Bureau of Prisons PA-Canaan USP","Federal Bureau of Prisons PA-Lewisburg USP","Federal Bureau of Prisons PA-Loretto FCI","Federal Bureau of Prisons PA-McKean FCI","Federal Bureau of Prisons PA-Philadelphia FDC","Federal Bureau of Prisons PA-Schuylkill FCI","Franklin County PA-Jail",
"GEO Group PA-Moshannon Valley Center","Huntingdon County PA-Prison","Indiana County PA-Jail","Lackawanna County PA-Jail","Lawrence County PA-Prison","Lebanon County PA-Correctional Facility","Lehigh County PA","Luzerne County PA-Correctional Facility","Lycoming County PA","McKean County PA-Prison","Mercer County PA-Prison","Mifflin County PA-Prison","Montgomery County PA-Correctional Facility","Montgomery County PA-Juvenile Detention","Montour County PA-County Jail","Northampton County PA","Pennsylvania Department of Corrections","Pike County PA-Correctional Facility","Schuylkill County PA-County Prison","Snyder County PA-Prison","Somerset County PA-Jail","Susquehanna County PA-Prison","Westmoreland County PA-County Prison","York County PA","Federal Bureau of Prisons PR-Guaynabo MDC","Puerto Rico Department of Corrections-Aguadilla","Puerto Rico Department of Corrections-Arecibo","Puerto Rico Department of Corrections-Arecibo 384","Puerto Rico Department of Corrections-Arecibo Camp","Puerto Rico Department of Corrections-Bayamon 1072","Puerto Rico Department of Corrections-Bayamon 292","Puerto Rico Department of Corrections-Bayamon 308","Puerto Rico Department of Corrections-Bayamon 448","Puerto Rico Department of Corrections-Bayamon 501","Puerto Rico Department of Corrections-Bayamon 705","Puerto Rico Department of Corrections-Guayama 1000","Puerto Rico Department of Corrections-Guayama 500","Puerto Rico Department of Corrections-Jayuya","Puerto Rico Department of Corrections-Mayaguez","Puerto Rico Department of Corrections-Ponce 1000","Puerto Rico Department of Corrections-Ponce 420","Puerto Rico Department of Corrections-Ponce 500","Puerto Rico Department of Corrections-Ponce Main",
"Puerto Rico Department of Corrections-Rio Grande","Puerto Rico Department of Corrections-Vega Alta","Puerto Rico Dept. of Corrections-Bayamon Women","Puerto Rico Dept. of Corrections-Guayama 296 – 945","Puerto Rico Dept. of Corrections-Salinas Women","Donald Wyatt Federal Detention Facility RI","Aiken County SC-Detention Center","CCSSC-Columbia Regional Care Center","Charleston County SC","Charleston SC -Juvenile Detention","Federal Bureau of Prisons SC-Bennettsville FCI","Federal Bureau of Prisons SC-Edgefield FCI","Federal Bureau of Prisons SC-Estill FCI","Federal Bureau of Prisons SC-Williamsburg FCI","Horry County SC","Orangeburg County SC – Detention Center","South Carolina Department of Corrections","USNSC-USN Charleston NAVCONBRIG","CECSD-Black Hills Community Alternative","Federal Bureau of Prisons SD-Yankton FPC","South Dakota Department of Corrections","Dickson County TN – County Jail","Fayette County TN – County Jail","Federal Bureau of Prisons TN-Memphis FCI","Federal Bureau of Prisons TN-Memphis Satellite","Madison County TN","Robertson County TN-Detention","Sevier County TN","Shelby County TN","Tennessee Department of Corrections","Williamson County TN-Detention Center","Wilson County TN-Jail","2nd 25th Judicial Dist. TX-Gonzales ISF","Brazos County TX","Burnet County TX-County Jail","City of Arlington TX-City Jail","Colorado County TX-County Jail","Corpus Christi TX-City Detention","Duncanville TX-City Jail","El Paso County TX","Federal Bureau of Prisons TX-Bastrop FCI","Federal Bureau of Prisons TX-Beaumont FCC","Federal Bureau of Prisons TX-Big Spring FCI","Federal Bureau of Prisons TX-Bryan FPC","Federal Bureau of Prisons TX-Carswell FMC","Federal Bureau of Prisons TX-Fort Worth FCI","Federal Bureau of Prisons TX-Houston FDC","Federal Bureau of Prisons TX-La Tuna FCI","Federal Bureau of Prisons TX-La Tuna FSL (El Paso)","Federal Bureau of Prisons TX-Seagoville FCI","Federal Bureau of Prisons TX-Texarkana FCI","Federal Bureau of Prisons TX-Three Rivers FCI","Gaines County TX-County Jail","Galveston County TX-Jail","GEO Group TX – Brooks County Detention Center","GEO Group TX – Coastal Bend Detention Center","GEO Group TX – Reeves R1 & R2 Correctional","GEO Group TX- East Hidalgo Detention Center","GEO Group TX-Big Spring Complex","GEO Group TX-Joe Corley Detention",
"GEO Group TX-Karnes Correctional Center","GEO Group TX-Reeves County COmplex R1 and R2","GEO Group TX-Rio Grande Detention Center","GEO Group TX-Val Verde Correctional","Guadalupe County TX-Jail","Harris County TX","Hidalgo County TX-Jail","Hill County TX","Hood County TX-Jail","Jefferson County TX-Correctional","Jefferson County TX-Downtown Jail","Jefferson County TX-Minnie Rogers Juvenile","Jefferson County TX-Womens Center","Johnson County TX-Correctional Facility","Jones County TX-Jail","Keller TX-City Jail","Lee County TX-County Jail","Lubbock County TX-Community Corrections","McLennan County TX","McLennan County TX – Jack Harwell Detention Center (Site ID 239)","Orange County TX-Jail","Parker County, TX – Main Jail","Pasadena TX-Davis Street City Jail","Pecos County TX-Jail","Pecos TX-City Criminal Justice Center","Potter County TX-County Detention","Randall County TX-Detention Center","Reeves County TX-Jail","Rusk County TX-County Jail","Tom Green County TX-Adult Detention","Waller County TX-Jail","Washington County TX -Jail","Wichita County TX","Wilbarger County TX-Jail","Box Elder County UT-Jail","Central Utah Correctional","Duchesne County UT-Jail","Kane County UT","Salt Lake City UT – Metro Jail","Utah State Prison","Blue Ridge Regional Jail","Caroline County (PCRJ) VA – Caroline Detention Facility","Chesterfield County VA-County Jail","Culpeper County VA-County Jail","Federal Bureau of Prisons VA-Lee USP","Federal Bureau of Prisons VA-Petersburg FCC","Gloucester County VA-Jail","Hampton City, VA","Henrico County VA-Regional Jail","Loudoun County VA-Adult Detention","Meherrin River (RJA) VA","Middle River VA-Regional Jail","Montgomery County VA-Jail","New River Valley VA-Regional Jail","Norfolk VA-City Jail","NW Regional VA-Adult Detention","Pamunkey (RJA) VA-Regional Jail (Site ID 185)","Piedmont VA-Regional Security Center","Portsmouth VA","Prince William-Manassas VA","Rappahannock VA-Regional Jail","Richmond VA-City Jail","Riverside District VA-Regional Jail","Roanoke City VA – Jail","Southside VA-Regional Jail","USNVA-USN Chesapeake NAVCONBRIG","VAGOV-VA Center for Behavioral Rehab","Virginia Beach VA-Correctional Center","Virginia Department of Corrections","Virginia Peninsula Regional Jail","Western Tidewater VA-Regional Jail",
"Western Virginia VA – Regional Jail","Vermont Department of Corrections","AAFES WA-Joint Base Lewis-McChord","Federal Bureau of Prisons WA-Sea-Tac FDC","Grant County WA","Issaquah WA-City Jail","Nisqually Indian Tribe WA-Womens Jail","Snohomish County WA","South Correctional Entity SCORE WA-Jail","Stevens County WA-Jail","Thurston County WA-Juvenile Facility","Washington Department of Corrections-Airway Height","Washington Department of Corrections-Cedar Creek","Washington Department of Corrections-Clallam Bay","Washington Department of Corrections-Coyote Ridge","Washington Department of Corrections-Larch","Washington Department of Corrections-Olympic","Washington Department of Corrections-Washington","Washington Dept. of Corrections-Center For Women","Washington Dept. of Corrections-Mission Creek","Washington Dept. of Corrections-Monroe Complex","Washington Dept. of Corrections-Stafford Creek","Washington Dept. of Corrections-State Penitentiary","Dane County WI","Dodge County WI – Detention Facility","Eau Claire County WI","Federal Bureau of Prisons WI-Oxford FCI","Kenosha County WI","Menominee County WI-Tribal Jail","Milwaukee County WI","Outagamie County WI-Sheriffs Office","Sauk County WI-Jail","Sheboygan County WI","Walworth County Jail","Waukesha County WI – County Jail","Federal Bureau of Prisons WV-Alderson FPC","Federal Bureau of Prisons WV-Beckley FCI","Federal Bureau of Prisons WV-Gilmer FCI","Federal Bureau of Prisons WV-Hazelton FCC","Federal Bureau of Prisons WV-McDowell FCI","Federal Bureau of Prisons WV-Morgantown FCI","McDowell County WV-Stevens Correctional","West Virginia Division of Corrections and Rehabilitation","West Virginia Regional Jail and Correctional Facility","West Virginia Regional Jail Authority-Central Jail","West Virginia Regional Jail Authority-Eastern Jail","West Virginia Regional Jail Authority-No. Central","West Virginia Regional Jail Authority-Northern","West Virginia Regional Jail Authority-Potomac High","West Virginia Regional Jail Authority-So. Central","West Virginia Regional Jail Authority-Southern","West Virginia Regional Jail Authority-Southwestern","West Virginia Regional Jail Authority-Tygart Vlly","West Virginia Regional Jail Authority-Western Jail","CECWY-Casper Re-Entry Center"];

const vmFacs = ['Aiken County, SC', 'Alameda County, CA', 'Allegheny County, PA', 'Allen County, IN', 'Baldwin County, AL', 'Berrien County,MI', 'Brazos County, TX', 'Brevard County, FL', 'Bucks County, PA', 'Camden County, NJ', 'Charleston County, SC', 'Charleston County, SC - Juvenile', 'Charlotte County, FL', 'Chautauqua County, NY', 'Chesterfield County, VA', 'Clackamas County, OR', 'Clark County, NV', 'Cobb County, GA', 'Cumberland County, NC', 'Cumberland County, NJ', 'Davidson County, TN', 'Delaware County, PA', 'Dickson County, TN', 'Douglas County, GA', 'Douglas County, NE', 'Durham County, NC', 'El Paso County, CO', 'Escambia County, FL', 'Fayette County, TN', 'Galveston County, TX', 'Genesee County, MI', 'Glenn County, CA', 'Guadalupe County, TX', 'Hampton Roads, VA', 'Harford County, MD', 'Highlands County, FL', 'Hillsborough County, FL', 'Howard County, IN', 'Hudson County, NJ', 'Jefferson County, TX - Professional Visits', 'Johnson County, TX', 'Kane County, UT', 'Kenosha County, WI', 'Lackawanna County, PA', 'Lee County, FL', 'Lehigh County, PA', 'Los Angeles County, CA', 'Luna County, NM', 'Madison County, TN', 'Manatee County, FL', 'Maricopa County, AZ (Professional)', 'Marin County, CA', 'Marion County, IN', 'Martin County, FL', 'McLennan County, TX', 'Mecklenburg County, NC', 'Meherrin River Regional, VA', 'Miami-Dade County, FL', 'Middle River Regional, VA', 'Mobile County, AL', 'Montgomery County, PA', 'Muskegon County, MI', 'New River Valley, VA', 'North Western Regional, VA', 'Ocean County, NJ', 'Ohio ODYS - Ohio Dept of Youth Services', 'Orange County, FL', 'Orange County, NY', 'Palm Beach County, FL', 'Passaic, NJ', 'Peoria County, IL', 'Pima County, AZ', 'Pinellas County, FL', 'Potter County, TX', 'Prince William, VA', 'Randall County, TX', 'Rankin County, MS', 'Rappahannock Regional Jail, VA', 'Riverside County, VA', 'Roanoke, VA', 'Robertson County, TN', 'San Benito, CA', 'San Francisco, CA', 'San Luis Obispo County, CA', 'Sarasota County, FL', 'SCORE WA', 'Sheboygan County, WI', 'Shelby County, TN (The Farm site only)', 'Shelby County Main Jail, TN', 'Snohomish County, WA', 'St. Joseph, IN', 'St. Lucie County, FL', 'Stanislaus County, CA', 'Tallahatchie, MS - Core Civic', 'Tallapoosa, AL', 'Tippecanoe, IN', 'Tom Green County, TX', 'Tulare County, CA', 'Two Bridges, ME', 'Virginia Peninsula Regional Jail, VA', 'Washington County, MD', 'Washington DC – District of Columbia', 'Waukesha County, WI', 'Westmoreland County, PA', 
'Wilson County, TN', 'Yamhill County, OR', 'York County, PA', 'CA CDCR - California Dept of Corrections and Rehabilitation', 'CO DOC - Colorado Department of Corrections', 'D.C. DOC - District of Columbia Dept of Corrections', 'IL DOC - Illinois Department of Corrections', 'IN DOC - Indiana Dept of Corrections', 'ME DOC - Maine Department of Corrections', 'MI DOC - Michigan Department of Corrections', 'NH DOC - New Hampshire Dept of Corrections', 'OH DOC – Ohio Dept of Corrections', 'SC DOC - South Carolina Dept of Corrections', 'SD DOC - South Dakota Dept of Corrections', 'VA DOC – Virginia Dept of Corrections', 'VT DOC – Vermont Dept of Corrections'];

const goFacs = ["Cumberland County Detention Center NC","Graham Correctional SC DOC","Ridgeland Correctional Institution SC DOC","Salem County NJ Correctional Facility","12th District TN Drug Court (Guardian)","21st District Drug Court (Guardian)","31st Judicial District Adult Recovery Court (Guardian)","3B Juvenile Detention Center ID","4th Avenue Jail - Maricopa AZ (Closed)","Ada County Jail ID","Ada County Juvenile Detention Center","Adams Adult Correctional Complex PA","Adams County PA Adult Re-entry Housing","Adams MS County Correctional Center","Adelanto ICE Processing Center CA","Aguadilla PR DOC","Aiken County SC","Alabama July 1 2016 Rates","Alachua County Court Services, FL (Guardian)","Albany County Jail NY","Albany County, WY","Albemarle County VA","Albertville, AL","Allegan County Corrections Center MI","Allegany County NY","Allegheny County Jail PA","Allegheny County PA Shuman Juvenile Detention Center JDC","Allen County IN Comm. Corrections","Allen County Jail - IN","Allendale Correctional SC DOC","Anoka County Jail - MN","Anthony Correctional (WV DOC)","Apache County Probation, AZ (Guardian)","Arab Police Department AL","Aransas County","Arapahoe County CO","Arecibo 384 PR DOC","Arecibo Camp PR DOC","Arecibo Correctional PR DOC","Arkansas Valley CO DOC - CO","Artesia Family Residential Center","Atascosa Juvenile TX","Atlantic County NJ","Aurora, Co","Austin County TX","Baker County, OR","Bandera, TX","Bannock County ID","Bay County FL","Bayamon 1072 PR DOC","Bayamon 501 PR DOC","Bayamon 705 PR DOC","Bayamon Main 292 PR DOC","Bayamon Main 308/448 PR DOC","Bayamon Womens PR DOC","Baylor Women's DE DOC","Bayouview Correctional Center LA","Beaver County Jail PA","Beckham County OK","Benton County Jail WA","Benton County OR Jail","Bergen NJ","Berkeley Report Center (Guardian)","Berks County Jail PA","Berks County Residential","Bernalillo County Metro Detention Center","Bernalillo County Youth Center","Bingham County, ID","Bingham County, ID (Guardian)","Blaine County, ID",
"Blue Ridge Regional Jail VA Amherst","Blue Ridge Regional Jail VA Bedford","Blue Ridge Regional Jail VA Campbell","Blue Ridge Regional Jail VA Halifax","Blue Ridge Regional Jail VA Lynchburg","Bluebonnet ICE Detention Center - TX","Boaz City, AL","Bolivar County MS","Bonner County Detention Center, ID","Bonneville, ID","Boyd County Jail KY","Boyle County Detention Center KY", "Bradley TN","Brazos County TX","Bremerton Police Department","Broad River Correctional SC DOC","Broome County NY","Broward, FL","Broward_FL","Bucks County PA","Buffalo County, NE","Buffalo, NY","Buffalo, NY - Clone 2016-05-11","Burnet County Jail (DO NOT USE)","Burnet County Jail - TX","Burnet, TX","Butte County Probation","CCA_Frankfort_KY","CCNO, OH","CDCR_Acton Conservation Camp","CDCR_Alder Conservation Camp","CDCR_Antelope Conservation Camp","CDCR_Avenal State Prison ASP","CDCR_Bautista Conservation Camp","CDCR_Ben Lomond Conservation Camp","CDCR_California City Correctional Facility CAC","CDCR_California Correctional Center CCC","CDCR_California Correctional Institution CCI","CDCR_California Health Care Facility CHCF Stockton","CDCR_California Institution for Men CIM","CDCR_California Institution for Women CIW","CDCR_California Medical Facility CMF","CDCR_California Men’s Colony CMC","CDCR_California Rehabilitation Center CRC","CDCR_California State Prison Centinela CEN","CDCR_California State Prison Corcoran COR","CDCR_California State Prison Los Angeles County LAC","CDCR_California State Prison Sacramento SAC","CDCR_California State Prison Solano SOL","CDCR_California Substance Abuse Treatment Facility and State Prison Corcoran SATF CSP Corcoran","CDCR_Calipatria State Prison CAL","CDCR_Central California Womens Facility CCWF","CDCR_Chuckawalla Valley State Prison CVSP","CDCR_Correctional Training Facility CTF","CDCR_Cuesta Conservation Camp","CDCR_Deadwood Conservation Camp","CDCR_Delta Conservation Camp","CDCR_Eel River Conservation Camp","CDCR_Fenner Canyon Conservation Camp","CDCR_Folsom State Prison FSP","CDCR_Folsom Womens Facility FWF","CDCR_Francisquito Conservation Camp","CDCR_Gabilan Conservation Camp","CDCR_Growlersburg Conservation Camp","CDCR_High Desert State Prison HDSP","CDCR_Holton Conservation Camp","CDCR_Intermountain Conservation Camp","CDCR_Ironwood State Prison ISP","CDCR_Ishi Conservation Camp","CDCR_Julius Klein Conservation Camp","CDCR_Kern Valley State Prison KVSP","CDCR_Konocti Conservation Camp",
"CDCR_La Cima Conservation Camp","CDCR_Malibu Conservation Camp","CDCR_Miramonte Conservation Camp","CDCR_Mount Bullion Conservation Camp","CDCR_Mountain Home Conservation Camp","CDCR_Mule Creek State Prison (MCSP)","CDCR_N.A. Chaderjian Youth Correctional Facility","CDCR_Norco Conservation Camp","CDCR_North Kern State Prison NKSP","CDCR_O.H. Close Youth Correctional Facility","CDCR_Oak Glen Conservation Camp","CDCR_Owens Valley Conservation Camp","CDCR_Parlin Fork Conservation Camp","CDCR_Pelican Bay State Prison PBSP","CDCR_Pine Grove DJJ Conservation Camp","CDCR_Pleasant Valley State Prison PVSP","CDCR_Prado Conservation Camp","CDCR_Puerta La Cruz Conservation Camp","CDCR_Richard J Donovan Correctional Facility RJD","CDCR_Salinas Valley State Prison SVSP","CDCR_Salt Creek Conservation Camp","CDCR_San Quentin State Prison SQ","CDCR_Sierra Conservation Center SCC","CDCR_Solano","CDCR_Sugar Pine Conservation Camp","CDCR_Trinity River Conservation Camp","CDCR_Vallecito Conservation Camp","CDCR_Valley State Prison VSP","CDCR_Ventura Training Center","CDCR_Ventura Youth Correctional Facility","CDCR_Wasco State Prison WSP","CDCR_Washington Ridge Conservation Camp","Caddo Parish","Caddo Parish LA (Trinity)","Calhoun Co AL Community Corrections (Guardian)","Calhoun County AL Juvenile (Guardian)","Calhoun County MI","Calhoun County, AL","Cambria County Prison PA","Camden County MO","Camden County NJ","Campbell County, WY","Canyon County, ID","Caribou County ID","Carl F Bryan Juvenile Hall (Nevada Co) CA","Carter County Detention Center KY","Cascade","Cattaraugus County Jail NY","Cayuga County NY","Central Arizona Florence Correctional Complex","Central County Jail","Central Office OH","Central Valley ICE Processing Center CA GEO","Centre County Correctional Facility PA","Charleston County Jail SC","Chautauqua County NY","Cheatham Co TN (Guardian)","Chelan County WA","Chenango County NY","Cherokee County Detention Center AL","Cherokee County Juvenile Court (Guardian)","Chester County Detention Center SC","Chester County Jail, PA","Chesterfield County Jail VA","Cheyenne Mountain Re-Entry Center","Christian KY","Cibola County Correctional Center NM","Cimarron Correctional Facility","City Of Richmond","City of Los Angeles Police Department CA","Clackamas Co OR","Clarion County PA","Clark County WA","Clatsop County, OR (Guardian)",
"Clay County MS","Clearfield County PA","Clinton County NY","Coast County Correctional Facility","Coconino County Adult Probation, AZ (Guardian)","Coconino County Detention Facility AZ","Coffee Creek Correctional Institution","Colbert County Jail AL","Collier IJC - FL","Collier NJC - FL","Columbia River Correctional Institution","Community Probation Services (Guardian)","Community Solutions Inc","Community Solutions Inc. CT","Community Transitional Services","Contractor Tech, GTL Work Site","Cook County Department of Corrections","Coos County Jail OR","Coosa County, AL","Correctional Alternatives (Guardian)","Cortland County NY","Covington County AL","Cowlitz county WA","Crosspoint Inc (Guardian)","Cullman County Detention Center AL","Cumberland Co Prison PA","Curry County Jail OR","Curry County, OR (Guardian)","D Ray James Correctional","DO NOT USE- Washington DC Jail CTF","DONT USE","DONT USE - City of Philadelphia PA","DONT USE - Luzerne County MOU","DUPE - CDCR_Mule Creek State Prison MCSP","Dallas County, AL","Dallas Data Center (DDC)","Dane WI","Dauphin County Prison PA","Dauphin County Prison WR PA","Davidson County, TN","Dawson Correctional Facility (County) MT","Dawson Correctional Facility (State) MT","DeKalb County AL","Decatur City, AL","Deer Ridge Correctional Institution","Default Clone facility - ITS","Default Clone facility - ITS - Clone 2021-08-12","Default Clone facility - ITS - Clone 2021-08-12","Default Clone facility - ITS - Clone 2021-10-08","Delaware Co (new), IN","Delaware County IN","Delaware County Jail","Delaware County, NY","Delaware county PA","Delete me do not use","Demographic Facility 2","Demographic Facility 3","Demopolis PD AL","Denmar Correctional Center (WV DOC)","Deschutes County Adult Jail OR","Desert View Annex","Dickson County, TN","Dimmit Co Jail","Dismas Charities (Albuquerque - Guardian)","Dismas Charities (Atlanta - Guardian)","Dismas Charities (Augusta - Guardian)","Dismas Charities (Charleston - Guardian)","Dismas Charities (Clarksburg - Guardian)","Dismas Charities (Corpus Christi - Guardian)","Dismas Charities (Dania Beach - Guardian)","Dismas Charities (Del Rio - Guardian)","Dismas Charities (El Paso - Guardian)","Dismas Charities (Greensboro - Guardian)","Dismas Charities (Hattiesburg - Guardian)","Dismas Charities (Kearney - Guardian)",
"Dismas Charities (Laredo - Guardian)","Dismas Charities (Las Cruces - Guardian)","Dismas Charities (Lexington - Guardian)","Dismas Charities (Louisville - Guardian)","Dismas Charities (Lubbock - Guardian)","Dismas Charities (Macon - Guardian)","Dismas Charities (Manchester - Guardian)","Dismas Charities (Memphis - Guardian)","Dismas Charities (Midland - Guardian)","Dismas Charities (Montgomery - Guardian)","Dismas Charities (Nashville - Guardian)","Dismas Charities (Orlando - Guardian)","Dismas Charities (Savannah - Guardian)","Dismas Charities (Sioux City - Guardian)","Dismas Charities (Tucson - Guardian)","Dismas Charities (Tupelo - Guardian)","Dismas Charities DRC (Memphis - Guardian)","District 1 Juvenile Detention","Dodge County WI","Dona Ana County NM","Donald Wyatt RI","Dont use - old","Douglas County Colorado","Douglas County GA","DuPage County Jail IL","Dubuque County IA","Durango Jail - CLOSED","Durham Detention Center NC","Duval County FL","EATON (Guardian)","East Baton Rouge, LA","East Coast Judicial Monitoring (Guardian)","Eastern Oregon Correctional Institution","Eden Detention Center","Effingham County GA","Effingham Prison, GA","Effingham_GA","El Centro, Ca CLOSED","El Dorado Correctional Facility - (KS DOC)","El Dorado Oswego - (KS DOC)","El Paso County Annex - TX","El Paso County CO","El Paso Detention Center TX","El Paso, TX","El Valle Detention Facility","Elizabeth, NJ","Elko County NV","Ellsworth Correctional Facility - (KS DOC)","Elmore County, ID","Eloy Detention Center ICE AZ","Escambia (DONT USE)","Escambia County Community Corrections, FL (Guardian)","Escambia County Jail - FL","Essex County Correctional NJ","Essex County NY","Etowah County Community Corrections (Guardian)","Etowah County, AL","Evans Correctional Institution SC DOC","Evanston, IL","Fayette County","Fayette County, PA","Fillmore County NE","Flagler FL (Trinity)","Florence, AZ","Folkston ICE Processing Center GA","Fort McDowell Yavapai Nation (Guardian)","Fort Payne City Jail AL","Franklin County AL","Franklin County Jail PA","Franklin County KY","Franklin County NY","Free to use","Free to use 8","Freemont County ID -- Dont Use","Fremont County ID","Fremont Detention Facility CA","Fresh clone free to use", "Fresno County California","Fruitland Call Center","Fulton County NY","GA DCS (Alapaha - Guardian)","GA DCS (Alcovy - Guardian)","GA DCS (Appalachian - Guardian)",
"GA DCS (Atlanta - Guardian)","GA DCS (Atlantic - Guardian)","GA DCS (Augusta - Guardian)","GA DCS (Bell-Forsyth - Guardian)","GA DCS (Blue Ridge - Guardian)","GA DCS (Brunswick - Guardian)","GA DCS (Chattahoochee - Guardian)","GA DCS (Cherokee - Guardian)","GA DCS (Clayton - Guardian)","GA DCS (Cobb - Guardian)","GA DCS (Conasauga - Guardian)","GA DCS (Cordele - Guardian)","GA DCS (Coweta - Guardian)","GA DCS (Dougherty - Guardian)","GA DCS (Douglas - Guardian)","GA DCS (Dublin - Guardian)","GA DCS (Eastern - Guardian)","GA DCS (Enotah - Guardian)","GA DCS (Flint - Guardian)","GA DCS (Griffin - Guardian)","GA DCS (Gwinnett - Guardian)","GA DCS (Houston - Guardian)","GA DCS (Lookout Mountain - Guardian)","GA DCS (Macon - Guardian)","GA DCS (Middle - Guardian)","GA DCS (Mountain - Guardian)","GA DCS (Northeastern - Guardian)","GA DCS (Northern - Guardian)","GA DCS (Ocmulgee - Guardian)","GA DCS (Oconee - Guardian)","GA DCS (Ogeechee - Guardian)","GA DCS (Pataula - Guardian)","GA DCS (Paulding - Guardian)","GA DCS (Piedmont - Guardian)","GA DCS (Rockdale - Guardian)","GA DCS (Rome - Guardian)","GA DCS (South Georgia - Guardian)","GA DCS (Southern - Guardian)","GA DCS (Southwestern - Guardian)","GA DCS (Stone Mountain - Guardian)","GA DCS (Tallapoosa - Guardian)","GA DCS (Tifton - Guardian)","GA DCS (Toombs - Guardian)","GA DCS (Towaliga - Guardian)","GA DCS (Waycross - Guardian)","GA DCS (Western - Guardian)","GEO Brooks County Detention Center","GEO Coastal Bend TX","GEO Delaney Hall NJ","GEO Deyton County GA","GEO Eagle Pass Correctional Facility","GEO East Hidalgo Detention Center","GEO Golden State Annex","GEO Karnes County Correctional","GEO Lawton Correctional Facility","GEO Queens Detention Facility NY","GEO Rio Grande Detention Center TX","GEO Val Verde TX","GEO_Care AL Therapeutic Education Fac","GTL Mobile AL Office","GTL Warehouse AWN Dallas Office","GTL Warehouse WIFI Dallas Office","Gallatin County, Mt","Garfield County CO","Genesee County, MI","Georgia 3","Georgia 4","Georgia Rox","Gila County Jail AZ","Gila County Probation, AZ (Guardian)","Gillespie County Jail TX","Glades County FL","Glenn County Jail CA","Glenn E. Dyer Detention Facility, CA","Glory House (Guardian)","Gooding County ID","Goodman Correctional Institution SC DOC","Grand Prairie TX","Grand Prairie TX AWN Lab","Grant County Detention Center KY","Greene County Jail MO","Greene County NY","Guadalupe County TX Jail",
"Guardian Service Group (Guardian)","Guardian_DEV","Guardian_QA","Guardian_STG","Guayama 1000 PR DOC","Guayama 296/945 PR DOC","Guayama 500 PR DOC","Guntersville Police Department AL","HI_DPS Halawa Corr Facility (HCF)","HI_DPS Hale Nani Reintegration Center (HNRC)","HI_DPS Hawaii Comm Corr Center (HCCC)","HI_DPS Kauai Comm Corr Center (KCCC)","HI_DPS Kulani Corr Facility (KCF)","HI_DPS Laumaka Work Furlough Center (LWFC)","HI_DPS Maui Comm Corr Center (MCCC)","HI_DPS Oahu Comm Corr Center (OCCC)","HI_DPS Waiawa Corr Facility (WCF)","HI_DPS Womens Comm Corr Center (WCCC)","Hale County, AL","Hamilton County Jail, IN","Hamilton County Work Release","Hampton City VA HCCC (Annex)","Hampton City VA HCF (Main)","Hampton Roads Regional Jail VA","Harlan County Detention Center KY","Harrison County Community Corrections, WV (Guardian)","Henderson County Detention Center KY","Hendry County Jail FL","Henrico County East VA","Henrico County West VA","Herkimer County NY","Hill County Jail TX - TX","Hillsborough FL Division I Orient Road Jail","Hillsborough FL Division II Falkenburg Road Jail FRJ","Hood County Jail - TX","Hood River County (Guardian)","Houston, TX","Howard County Jail IN","Howard County MD","Howard R Young DE DOC","Hunt County TX","Huntingdon County PA","Hutchinson Correctional Facility - (KS DOC)","Hutchinson Correctional Facility Work Release - (KS DOC)","Huttonsville Correctional Center (WV DOC)","ICE Clone free to use","ICE Holding Cells","ICE Pro Bono","ICE Tertiary Holding Cells","ICE Tertiary Holding Cells Atlanta GA","ICE clone free to use 5","IDS","INDOC Branchville Correctional Facility","INDOC Chain O Lakes","INDOC Correctional Industrial Facility","INDOC Edinburgh Correctional Facility","INDOC Heritage Trail Correctional Facility","INDOC Indiana State Prison","INDOC Indiana Womens Prison","INDOC LaPorte Juvenile Correctional Facility","INDOC Logansport Treatment and Intake Unit","INDOC Loggansport Control Unit","INDOC Madison Correctional Facility","INDOC Miami Correctional Facility","INDOC New Castle Correctional Facility","INDOC Pendleton Correction Facility","INDOC Pendleton Juvenile Correction Facility","INDOC Plainfield Correctional Facility","INDOC Putnamville Correctional Facility","INDOC Reception and Diagnostic",
"INDOC Rockville Correctional Facility","INDOC Southbend Community Re Entry Center","INDOC Wabash Valley Correctional Facility","INDOC Westville Correctional Facility","Iberia Parish LA","Imperial County Jail CA","Imperial Regional Detention Facility CA","Indiana County Jail","Inspire Correctional","Integrity Supervision Services (Guardian)","Intelmate Refund","Internal Product","Intertech Probation Inc. (Guardian)","Involvement Incorporated","Inyo County CA","Irving TX - Touchpay","Irwin County GA - CLOSED","Jackson Co AL (Guardian)","Jackson County Jail AL","Jackson County OR Jail","Jackson County OR Transitional","James Vaughn DE DOC (Smyrna, DE)","James Vaughn LAB","Jayuya PR DOC","Jefferson County AL","Jefferson County AL","Jefferson County AL Youth Detention","Jefferson County ID","Jefferson County MO","Jefferson County MS","Jerome County, ID","Jerome County, ID - Clone 2015-02-03","Jessamine County Detention Center (Guardian)","Jessamine County Detention Center KY","Joe Corley Detention TX","Johnson County TX","Jones County Jail TX - TX","K","Kalamazoo County Jail MI","Kane Co IL","Kane County UT","Kansas Headquarters (KSDOC) - KS","Kansas Juvenile Correctional Complex - (KS DOC)","Karnes County Family Residential Center TX","Kent County MI","Kentucky River Regional Jail KY","Kershaw Correctional Institution SC DOC","Kings County Jail CA","Kinney County Detention Facility","Kirkland Reception and Evaluation SC DOC","Kirkwood Police Dept MO","Kitsap County Jail GUARDIAN","Kitsap County WA","Knox County Jail IN","Kootenai County Jail ID","Krome, FL","La Palma Correctional Center CoreCivic","Lackawanna County Jail PA","Lafayette Parish (Guardian)","Lafayette Parish Corrections","Lake Co Magistrate Tphone","Lake County CA","Lake County Community Corrections, IN (Guardian)","Lake County IL Adult Corrections","Lake County Jail OH","Lake County Jail, IN","Lake Erie Interlock, Inc (Guardian)","Lakin Correctional Center for Women (WV DOC)","Lancaster County NE","Lane County OR","Langlade County WI County Jail","Lansing Correctional Facility - (KS DOC)","Laramie County Detention Facility","Laredo Detention Center CoreCivic","Larimer County CO - Detention Center","Larned Correctional Mental Health Facility - (KC DOC)","Lasalle Detention Facility LA",
"Lassen County Jail - CA","Latah County ID","Lauderdale County AL","Laurel County Correctional Center","Laurel County Correctional Center - Clone 2016-04-20","Leath Correctional Institution SC DOC","Leavenworth Detention Center","Lebanon County PA","Lee Correctional Institution SC DOC","Lee County FL CPU","Lee County FL Core","Lee County FL Main","Lee County, AL(Closed)","Lehigh County Community Corrections Center","Lehigh County PA","Lenawee County MI","Leon County, FL","Leslie County Detention Center KY","Lewis County Detention Center KY","Lewis County Jail WA","Lewis County NY","Lieber Correctional SC DOC","Linn County GUARDIAN","Linn County Jail OR","Linn County Jail OR - Clone 2016-03-16","Livesay SC DOC","Livingston County NY","Livingston Parish Detention Center LA","Los Angeles, CA","Loudoun County Jail VA","Lower Buckeye Jail CLOSED","Lucas County OH","Luzerne County PA","MIDOC DRF Carson City Correctional East West","MIDOC ECF Oaks Correctional","MIDOC ICF Ionia Correctional","MIDOC JCFG Robert Cotton Correctional","MIDOC MRF Macomb Correctional","MIDOC Newberry","MIDOC SMT Parnall Correctional","MIDOC SRF Saginaw Correctional","MIDOC TCF Thumb Correctional","MIDOC WCC Maxey Woodland Correctional","MIDOC WHV Womens Huron Valley Correctional East West","MacDougall Correctional SC DOC","Macomb County Jail MI","Madison County ID","Madison County Jail AL","Madison County Jail IL","Madison County Jail KY","Madison County NY","Malheur, OR","Manning Correctional Institution SC DOC","Mansfield, TX","Maricopa County Jails - Maricopa AZ","Marion Co Detention (Guardian)","Marion County AL","Marion County IN CJC County Jail","Marion County OR","Marion County, KY","Marion County, OR (Guardian)","Marion Main Jail IN","Marshall County IN","Marshall County Work Release AL","Marshall County, AL","Martin County FL","Martinsburg Correctional Center (WV DOC)","Mason Co Kentucky Detention Center (Guardian)","Mayaguez PR DOC","McCormick Correctional SC DOC","McCracken KY","McDowell County Jail - WV","McLean County IL","McLennan County Main Jail TX","McRae Correctional Facility","Mecklenburg Detention Center NC - NC","Medina County Jail","Meherrin River Regional Jail Alberta Facility","Meherrin River Regional Jail Mecklenburg Facility","Mendocino County CA","Mendocino Juvenile CA","Menominee Tribal Detention Facility","Mercer County PA Jail","Mesa CO","Mesa County CO County Jail","Mesa Verde ICE Processing Center CA",
"Miami County, IN","Miami Dade FL","Middle River Regional Jail VA","Middlesex County NJ","Milam County TX","Mill Creek Correctional Facility","Millennium State Correctional","Miller County Jail GA","Mini-Cassia Justice Center ID","Minnesota Correctional Facility Faribault","Minnesota Correctional Facility Lino Lakes","Minnesota Correctional Facility Moose Lake","Minnesota Correctional Facility Oak Park Heights","Minnesota Correctional Facility Red Wing","Minnesota Correctional Facility Rush City","Minnesota Correctional Facility Shakopee","Minnesota Correctional Facility St. Cloud","Minnesota Correctional Facility Stillwater","Minnesota Correctional Facility Togo","Minnesota Correctional Facility Willow River","Mirror Inc, KS (Guardian)","Mohave County AZ","Monroe County Jail IN","Montana State Prison","Montana Women's Prison","Monterey County Jail CA","Monterey County Juvenile","Montgomery County AL","Montgomery County Jail NY","Montgomery County PA","Montgomery County VA County Jail","Montgomery County, AL","Montgomery ICE Processing Center TX","Moose Lake MSOP","Morgan County, AL","Morris County Correctional","Moshannon Valley Processing Center","Mount Olive Correctional Complex (WV DOC)","Muskegon County MI","NCDPS Albemarle CI","NCDPS Avery Mitchell CI","NCDPS Caldwell CC","NCDPS Carteret CC","NCDPS Caswell CC","NCDPS Catawba CC","NCDPS Craggy CC","NCDPS Davidson CC","NCDPS Eastern CI","NCDPS Forsyth CC","NCDPS Franklin CC","NCDPS Gaston CC","NCDPS Greene CI","NCDPS Harnett CI","NCDPS Hyde CI","NCDPS Lincoln CC","NCDPS Lumberton CI","NCDPS New Hanover CC","NCDPS Orange CI","NCDPS Pamlico CI","NCDPS Pender CI","NCDPS Randolph CC","NCDPS Rutherford CC","NCDPS Sanford CC","NCDPS Scotland CI","NCDPS Southern CI","NCDPS Warren CI","NCDPS Wilkes CC","NCDPS Alexander CI","NCDPS Anson CC","NCDPS Bertie CI","NCDPS Central Prison","NCDPS Columbus CI","NCDPS Craven CI","NCDPS Dan River Prison Work Farm","NCDPS Foothills CI","NCDPS Granville CI","NCDPS Johnston CI","NCDPS Marion CI","NCDPS Maury CI","NCDPS Mountain View CI","NCDPS NCCIW","NCDPS Nash CI","NCDPS Neuse CI","NCDPS Pasquotank CI","NCDPS Piedmont CI","NCDPS Richmond CI","NCDPS Roanoke River CI","NCDPS Sampson CI","NCDPS Tabor CI","NCDPS Tyrrell Prison Work","NCDPS Wake Juvenile Detention Center","NCDPS Western CCCW","NORCOR Adult Facility","NW Regional Adult Detention Center VA","NW-RRC","Nassau Co FL","Natchez MS","Nevada County CA",
"Nevada Southern Detention Center","New River Valley Regional Jail","Nisqually Public Safety Complex WA","Norfolk City Jail VA","North Georgia Detention Center","Northampton County Prison PA","Northeast Ohio Correctional Center","Northern Correctional Center (WV DOC)","Northlake Detention MI","Northwest New Mexico Correctional Center","Norton Correctional Facility - (KS DOC)","Nye County, NV","ODRC Allen-Oakwood CI","ODRC Belmont CI","ODRC Chillicothe CI","ODRC Corrections Receptions Center","ODRC Dayton CI","ODRC Franklin Medical Center","ODRC Grafton CI","ODRC Lake Erie CI","ODRC Lebanon CI","ODRC London CI","ODRC Lorain CI","ODRC Madison CI","ODRC Mansfield CI","ODRC Marion CI","ODRC Noble CI","ODRC North Central CI Complex","ODRC Northeast Ohio Correction Center","ODRC Northeast Reintegration Center","ODRC Ohio Reformatory for Women","ODRC Ohio State Penitentiary","ODRC Pickaway CI","ODRC Richland CI","ODRC Ross CI","ODRC Southeastern CI","ODRC Southern Ohio CI","ODRC Toledo CI","ODRC Trumbull CI","ODRC Warren CI","ODYS Circleville JCF","ODYS Cuyahoga Hills JCF","ODYS Indian River JCF","OREGON DOC DOME KIOSK","Office of Probation and Pretrial Services","Ohio County Correctional Center (WV DOC)","Okeechobee County Jail FL","Oklahoma County, OK","Oneida County NY","Ontario Call Center 2","Ontario OR Red Apple Kiosk","Orange County NY","Orange, NJ","Orangeburg County SC Detention Center","Oregon State Correctional Institution","Oregon State Penitentiary","Oriana House","Oswego County Jail NY","Otay Mesa Detention Center","Otero (Chaparral), NM","Otsego County NY","Ouachita Correctional Center LA","Outagamie County S.O Jail - WI","Owyhee County, ID","Ozaukee County WI County Jail","PATTERSON, NJ","PCRJ Caroline Detention VA","PWM, VA","Palmer Pre Release Center SC DOC","Pamunkey Regional Jail VA","Parker County Jail TX","Pasco County FL","Passaic County","Passaic, NJ","Paulding County GA","Payette, ID","Peoria County IL","Peoria County Jail IL","Perry Correctional Institution SC DOC","Peumansend Creek VA","Philadelphia PA","Piedmont County Jail VA","Pike County Correctional Facility","Pima County Adult Detention Complex AZ","Pine Hills Correctional Facility MT","Pine Prairie - Clone 2016-04-21","Pine Prairie LA","Pioneer Human Services (Seattle - Guardian)","Pioneer Human Services (Spokane - Guardian)","Pioneer Human Services (Tacoma - Guardian)","Placer County, CA",
"Polk County Jail OR","Polk IA",
"Ponce 1000 PR DOC","Ponce 304 PR DOC","Ponce 420 PR DOC","Ponce 500 PR DOC","Ponce 676 PR DOC","Ponce Main PR DOC","Port Isabel, TX","Porter County Jail IN","Potter County TX","Powder River Correctional Facility","Power County ID","Prairieland Detention Center TX","Pricing Template Deposit Fees","Pricing Template Jail -349","Pricing Template Jail -999","Pricing Template Jail 1000+","Pricing Template Prison","Prince William Manassas, VA","Pruntytown Correctional Center (WV DOC)","Pueblo of Pojoaque Tribal Court, NM (Guardian)","Pulaski County Detention Center KY","Purgatory Correctional Facility Washington County UT","Putnam County Jail NY","Randall County TX","Randolph County AL","Rankin Detention Center MS","Rappahannock Regional Jail - VA","Rensselaer County Sheriff NY","Reston Correctional Institute","Rhode Island District Court, RI (Guardian)","Rio Grande PR DOC","Rivers correctional institute","Riverside Correctional Facility MT","Riverside Regional Jail - VA","Roanoke City VA","Robstown, TX","Rock County Sheriff’s Office, WI (Guardian)","Rock County, WI","Rock Island IL Justice Center","Rock Valley Community Programs Inc (Guardian)","Rutherford County TN","SCORE WA","SD Parole (Aberdeen - Guardian)","SD Parole (Brookings - Guardian)","SD Parole (Huron - Guardian)","SD Parole (Mitchell - Guardian)","SD Parole (Pierre - Guardian)","SD Parole (Rapid City - Guardian)","SD Parole (Sioux Falls - Guardian)","SD Parole (Spearfish - Guardian)","SD Parole (Watertown - Guardian)","SD Parole (Yankton - Guardian)","SECURETRACKS GPS (Guardian)","Saguaro Correctional Center","Saint Marys Correctional Center WV","Salem Correctional Center (WV DOC)","Salinas PR DOC","Salt Lake County Sheirff's Office, UT (Guardian)","San Antonio","San Antonio 2","San Benito County - CA","San Juan Alternative Sentencing - NM","San Juan County UT","San Juan NM","San Mateo County *CLOSED*","Sandoval NM","Sanpete County, UT","Santa Ana City Jail CA","Santa Barbara County Jail","Santa Barbara Northern Jail","Santa Clara County CA Elmwood","Santa Clara County CA Main Jail","Santa Cruz County Jail AZ","Santa Cruz County Jail CA","Santa Rita Jail Alameda, CA","Santa Rosa County FL Jail","Santiam Correctional Institution","Sarasota County FL Jail","Saratoga County Jail - NY","Sarpy County Jail NE","Sauk County WI","Schenectady County NY","Schoharie County NY","Schuylkill County Prison PA",
"Scott County Jail IA","Scott County Jail MN","Seminole County, GA","Seneca County, NY","Sentinel","Sevier County Jail UT","Seward County (Guardian)","Shasta County Jail","Shelby County Corrections, TN","Shelby County Jail TN","Shelby County, AL","Shelby County, TN","Sherburne County, MN (Guardian)","Sheridan County WY (CLOSED)","Shoshone Bannock Tribes, ID (Guardian)","Shoshone County Jail ID","Shoshone-Bannock Tribes Corrections ID","Shutter Creek Correctional Institution","Skagit County Jail","Skagit County, WA","Snake River Correctional Facility","Snohomish County Jail, WA","Social Mobile","Somerset County Prison PA","Sonoma County Main","Sonoma North County CA","South Fork Forest Camp","South Louisiana LA","South Texas","South Texas Family Residential","Southside Regional Jail VA","Southwest Idaho Juvenile Detention Center","Spokane County Detention Svcs","Spokane Municipal Probation (Guardian)","St Clair MI","St Clair, AL","St Joseph IN","St Lawrence County Jail","St Lucie FL","St Peter MSOP and Community Preparation Services","Stay Home Monitoring, WA (Guardian)","Steuben County NY","Stewart Detention Center GA","Stewart Detention Center GA","Stockton Correctional Facility","Strafford County Jail NH","Sumner Co TN (Guardian)","Susquehanna County Jail PA","Sussex DE DOC","Sutter County Jail CA","Sutton County Jail TX","Sweetwater Detention Center WY","T. Don Hutto Residential Center TX","TRM (Corporate TN Office - Guardian)","TRM (East TN Office - Guardian)","TRM (MCHRA - Guardian)","TRM (Middle TN Office - Guardian)","TRM (South East TN Office - Guardian)","TRM (West TN Office - Guardian)","Tacoma, Wa","Talladega County AL","Tallahatchie County Correctional Facility","Talton ICE clone facility","Talton ICE clone facility - Clone 2020-07-09","Tarrant County, TX","Tennessee DOC","Texas City, TX","Thurston County Correctional Facility","Tillamook County, OR","Tillamook County, OR (Guardian)",
"Tippecanoe County Jail - IN","Tom Green County Jail - TX","Tompkins County Jail NY","Topeka Correctional (KSDOC) - KS","Topeka Work Release (KSDOC)","Torrance County Detention Facility","Towers Jail - CLOSED","Travel Tphones","Travel Tphones Bravo","Travel Tphones Charlie","Travel Tphones Delta","Trenton Correctional Institution SC DOC","Trenton, NJ","Tulare County Bob Wiley Detention CA","Tulare County Pre Trial Facility","Tulare County South County Detention","Turbeville Correctional SC DOC","Twin Falls, ID","Two Rivers Correctional Institution","Tyger River SC DOC","Uintah County, UT","Umatilla OR","Union County Community Corrections, OR (Guardian)","Use for new install","Utah County UT","Utah State Prison Draper","Uvalde County, TX","Uvalde, TX","VA DJJ Bon Air","Valley County Sheriff's Office, ID (Guardian)","Van Buren County Jail MI","Vanderburgh CC IN","Vanderburgh County IN","Vantron Lab","Victoria County","Victoria Juvenile","Virginia Beach Correctional Center VA","Virginia Center for Behavioral Rehabilitation - VA","Virginia Peninsula Regional Jail VA","WASPC_DOC","WASPC_EXPO","WASPC_ORG","Wahkiakum County, WA (Guardian)","Wake County Detention Center NC","Walker County Jail AL","Walton County FL","Walworth County WI","Warner Creek Correctional Facility","Washington County","Washington County IN","Washington County Jail MD","Washington County NY","Washington County OH Jail","Washington County PA Correctional Facility","Washington County TX","Washington County, ID","Washington DC Jail CDF and CTF","Wateree River Correctional SC DOC","Waukesha County Jail - WI","Wayne County Jail NC","Wayne County MI","Wayne County Municipal Court, OH (Guardian)","Webb County Detention Center TX","Webb County Jail TX","Weber UT (Trinity) DISABLED","Wentzville Police Dept MO","West Tennessee Detention Facility","Westate Corrections Network (Guardian)","Western Tidewater Regional Jail VA","Western Virginia Regional Jail VA","Westmoreland County Prison PA","Whiteside County Court Services (Guardian)","Whitley County Jail IN","Wichita Correctional (KSDOC) - KS","Wichita County TX Law Enforcement Ctr","Wicomico County Jail MD","Willacy, TX","Wilson County Jail TN","Winfield Correctional (KSDOC) - KS","Winnebago County IL","Winston Co Jail AL","Yates County NY",
"Yellowstone County Detention Center MT","Yoknapatawpha County","Yolo County CA Monroe Detention Center","Yolo County, CA (Guardian)","York County Prison PA","Yuba County Jail","Yuma County Jail CO","Zanesville County OH"];

updatePage();
defaultColors();
