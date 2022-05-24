/* 
            --- N O T E S G E N E R A T O R ---
    ~'.'.'.'... Created by Kristine Carter ...'.'.'.'~
        -==--------------- 2021 ---------------==- 

    todo:
    * scripts based on facility selected
    * rep todo checks (cpni and such)

*/

const version = document.getElementById('version-number');
version.innerText = '2.20523';

// issue is at [1]
// resolution is at [3]
const baseForm = [
    {
        elm: "textarea",
        placeholder: "scratchpad for jotting notes",
    },
    {
        label: "issue",
        type: "text",
        elm: "input",
        placeholder: "the reason for the customer's call",
        datalist: false,
        forNote: true
    },
    {
        label: "name",
        type: "text",
        elm: "input",
        placeholder: "enter the customer's full name",
        datalist: false,
        forNote: true
    },
    {
        label: "resolution",
        type: "text",
        elm: "input",
        placeholder: "the resolution you provided",
        datalist: false,
        forNote: true
    }    
];

const generateNoteForm = require('./notes.js');
const notes = generateNoteForm(baseForm);

// note form
const container = document.querySelector('main');
container.appendChild(notes.form);
const cnItem = {
    label: "passcode",
    type: "text",
    elm: "input",
    placeholder: "the customer's 4-to-8 digit passcode",
    datalist: false,
    forNote: true
}

notes.addItem(cnItem);

// top bar
const navLinks = [
    [
        {
            container: 'span',
        },
        {
            label: "OKTA",
            url: "https://gtl.okta.com",
        },
        {
            label: "ADP",
            url: "https://workforcenow.adp.com/portal/theme",
        },
        {
            label: "inContact",
            url: "https://inlogin.incontact.com/inContact/",
        },
        {
            label: "Confluence",
            url: "https://confluence.gtl.net/display/CALL/Training+Center+of+Excellence",
        },
        {
            label: "Helpful Links",
            url: "https://confluence.gtl.net/display/CALL/Helpful+Links",
        },
        {
            label: "SSO",
            url: "https://sso.gtlconnect.com/manage/users/",
        },
        {
            label: "Connectnetwork.com",
            url: "https://web.connectnetwork.com/",
        },
        {
            label: "Gettingout.com",
            url: "https://www.gettingout.com/",
        },
        {
            label: "Gtlvisitme.com",
            url: "https://www.gtlvisitme.com/app",
        },
        {
            label: "Gtl.net",
            url: "https://www.gtl.net/",
        },
        {
            label: "Viapath.com",
            url: "https://www.viapath.com/"
        },
        {
            label: "US DOC List",
            url: "https://en.wikipedia.org/wiki/Lists_of_United_States_state_prisons"
        }
    ],
    [
        {
            container: 'span',
            data: 'ConnectNetwork',
        },
        {
            label: 'hcares',
            url: 'http://hcares',
        },
        {
            label: 'dcares',
            url: 'http://dcares',
        },
        {
            label: 'research',
            url: 'http://hcares/csguide/default.aspx',
        },
        {
            label: 'cnbot',
            url: 'http://hcares/OCBOT/Default.aspx',
        },
        {
            label: 'sharepoint',
            url: 'https://gtlcorp.sharepoint.com/BillingCustomerService/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2FBillingCustomerService%2FShared%20Documents%2FForms%2FAllItems%2Easpx',
        },
        {
            label: 'command',
            url: 'https://ca.gtl.us/Modules/Home/',
        },
    ],
    [
        {
            container: 'span',
            data: 'GettingOut'
        },
        {
            label: 'secure1',
            url: 'https://www.intelmate.net/kiosk/login',
        },
        {
            label: 'secure2',
            url: 'https://secure2.intelmate.com/kiosk/login',
        },
        {
            label: 'visitation',
            url: 'https://command-center.telmate.com/ui#/main',
        },
        {
            label: 'wiki',
            url: 'https://sites.google.com/a/intelmate.com/telmate-general-customer-care/?pli=1',
        },
        {
            label: 'moneygram',
            url: 'https://online.moneygram.com/ExpressPaymentIPN/adhocQuery.do?r=t#results',
        },
        {
            label: 'verifi',
            url: 'https://secure.verifi.com/merchants/login.php',
        },
    ],
    [
        {
            container: 'span',
            data: 'VisManager'
        },
        {
            label: 'facilities',
            url: 'https://confluence.gtl.net/pages/viewpage.action?pageId=97070140',
        },
        {
            label: 'visitor support',
            url: 'https://gtlcorp-my.sharepoint.com/personal/zachary_leija_gtl_net/_layouts/15/Doc.aspx?sourcedoc={20cea1a5-c41e-4ff7-b61d-bb7bfc751a15}&action=edit&wd=target%28Facility%20info%20template.one%7Cc3f62de1-4cab-43e9-b735-ecfdd915dcc5%2FFacility%20Name%2C%20ST%7C7988597a-6597-4e4b-b3c4-657955f559bb%2F%29',
        },
        {
            label: 'ts visitation',
            url: 'https://gtlcorp.sharepoint.com/:o:/r/customerservice/_layouts/15/doc2.aspx?sourcedoc=%7B247c7058-ff12-4d5d-ae73-1eaf503c3a70%7D&action=view&wd=target(Customer%20Information%2FMobile%2C%20AL.one%7Cda29e54c-0192-4784-9174-765d58c5a77e%2FVisitor%20Support%20Info%7Ca6a21386-d08e-498b-aecc-1619e29ee449%2F)',
        },
    ]
    /*{
        category: 'general',
        label: '',
        url: '#',
    },*/
    
];


// datalists
const facList = document.getElementById('fac-list');

function addOptions(list, context){
    if (list[0]){
        for (let i = 0; i < list.length; i += 1){
            const option = document.createElement('option');
            data = list[i] + ` (${context})`;
            option.value = data;
            option.innerText = data;
            facList.appendChild(option); 
        }
    } else {
        for (const property in list) {
            for (i = 0; i < list[property].length; i += 1){
                const data = `${list[property][i]} in ${property}`;
                const option = document.createElement('option');
                option.value = data;
                option.innerText = data;
                facList.appendChild(option); 
            }
        }
    }
}   

function filterConfluence(filter){
    const filteredItems = [];
    for (const key in issueData){
        for (const key2 in issueData[key]){
            for (let i = 0; i < issueData[key][key2].length; i +=1){
                if (key2 !== filter) { continue }
                if (issueData[key][key2][i].label){
                    filteredItems.push(issueData[key][key2][i]);
                }
            }
        }
    }

    return filteredItems;
}

function updateIssueList(){
    document.querySelector('#issue-list').innerHTML = (function(){
        let dataOptions = '';
        const product = document.querySelector('#product').value;
    
        let dataList = issueData;
    
        if (product !== ""){
            dataList = filterConfluence(product)
        }
    
        for (const key in dataList){
            if (dataList[key].label){
                dataOptions += `<option value="${dataList[key].label}">${dataList[key].label}</option>`;           
            } else {
                dataOptions += `<option value="${key}">${key}</option>`;
            }
        }
    
        return dataOptions;
    })();
}

