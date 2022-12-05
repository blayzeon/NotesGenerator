/* 
            --- N O T E S G E N E R A T O R ---
    ~'.'.'.'... Created by Kristine Carter ...'.'.'.'~
        -==--------------- 2021 ---------------==- 

    todo:
    * scripts based on facility selected
    * rep todo checks (cpni and such)

*/

const facData = require("./facilities.json");
const issueData = require("./confluence.json");
const colorCtrl = require("./color.js");

// create left content
const form = [
  {
    type: "textarea",
    placeholder:
      "scratchpad for jotting down information (not included in notes)",
    copy: false,
    reset: true,
    datalist: false,
  },
  {
    label: "rep",
    type: "input",
    placeholder: "your full name",
    copy: false,
    reset: false,
    id: "rep-name",
    datalist: false,
  },
  {
    label: "issue",
    type: "input",
    placeholder: "the reason for the customer's call",
    copy: true,
    reset: true,
    datalist: "issue-list",
  },
  {
    label: "customer",
    type: "input",
    placeholder: "the customer's full name",
    copy: true,
    reset: true,
    id: "customer-name",
    datalist: false,
  },
  {
    label: "facility",
    type: "input",
    placeholder: "the inmate's facility",
    copy: true,
    reset: true,
    datalist: "fac-list",
  },
  {
    label: "product",
    type: "select",
    options: ["", "ConnectNetwork", "GettingOut", "VisManager"],
    placeholder: "the Viapath product that the customer needs assistance with",
    copy: false,
    reset: false,
    id: "product",
    datalist: false,
  },
  /* CN ITEMS */
  {
    label: "passcode",
    type: "input",
    placeholder: "the customer's 4-to-8-digit passcode",
    copy: true,
    reset: true,
    data: "ConnectNetwork",
  },
  /* GO ITEMS */
  {
    label: "email",
    type: "input",
    placeholder: "the customer's email address",
    copy: false,
    reset: true,
    data: "GettingOut",
  },
  {
    label: "inmate",
    type: "input",
    placeholder: "the inmate's first and last name",
    copy: false,
    reset: true,
    data: "GettingOut",
  },
  /* VM ITEMS */
  {
    label: "dob",
    type: "input",
    placeholder: "the customer's date of birth",
    copy: false,
    reset: true,
    data: "VisManager",
  },
  {
    label: "id",
    type: "input",
    placeholder: "the inmate's ID number",
    copy: false,
    reset: true,
    data: "VisManager",
  },
  {
    label: "resolution",
    type: "input",
    placeholder: "how you assisted the customer",
    copy: true,
    reset: true,
    id: "resolution",
    datalist: false,
  },
];

function copyStr(str) {
  const copyArea = document.createElement("textarea");
  copyArea.value = str;
  copyArea.setAttribute("readonly", "");
  document.body.appendChild(copyArea);
  copyArea.select();
  document.execCommand("copy");
  copyArea.remove();
}

function createForm(itemArray, buttons = true) {
  const form = document.createElement("form");

  for (let i = 0; i < itemArray.length; i += 1) {
    if (!itemArray[i].type) {
      continue;
    }

    const formItem = document.createElement("div");
    formItem.classList.add("form-group");

    if (itemArray[i].label) {
      const newLabel = document.createElement("label");
      newLabel.innerText = `${itemArray[i].label}: `;
      formItem.appendChild(newLabel);
    }

    const newInput = document.createElement(itemArray[i].type);
    if (itemArray[i].insert) {
      formItem.setAttribute("data-insert", "insert");
    }

    if (itemArray[i].datalist) {
      newInput.setAttribute("list", itemArray[i].datalist);
    }

    if (itemArray[i].data) {
      formItem.setAttribute("data-product", itemArray[i].data);
    }

    if (itemArray[i].reset) {
      newInput.setAttribute("data-reset", "reset");
    }

    if (itemArray[i].copy) {
      newInput.setAttribute("data-copy", itemArray[i].label);
    }

    if (itemArray[i].id) {
      newInput.setAttribute("id", itemArray[i].id);
    }

    if (itemArray[i].options) {
      for (let j = 0; j < itemArray[i].options.length; j += 1) {
        const newOption = document.createElement("option");
        newOption.value = itemArray[i].options[j];
        newOption.innerText = itemArray[i].options[j];
        newInput.appendChild(newOption);
      }
    } else if (itemArray[i].placeholder) {
      newInput.setAttribute("placeholder", itemArray[i].placeholder);
      newInput.setAttribute("type", "text");
    }

    formItem.appendChild(newInput);
    form.appendChild(formItem);
  }

  const formButtons = document.createElement("div");
  formButtons.classList.add("form-group");

  const copyBtn = document.createElement("button");
  copyBtn.setAttribute("type", "button");
  copyBtn.innerText = "copy";
  formButtons.appendChild(copyBtn);

  copyBtn.addEventListener("click", () => {
    const product = document.querySelector("#product");
    const formValues = Array.from(document.querySelectorAll("[data-copy]")).map(
      (x) => {
        return `${x.getAttribute("data-copy")}: ${x.value || "unknown"}`;
      }
    );

    if (product.value === "VisManager") {
      for (let i = 0; i < formValues.length; i += 1) {
        if (formValues[i].includes("passcode")) {
          formValues.splice(i, 1);
        }
      }
    }
    let noteString = formValues.join(" / ");

    if (noteString.length === 0) {
      // nothing to copy
      return;
    }

    // customize the note

    let opening = undefined;
    let closing = undefined;
    const rep = document.querySelector("#rep-name").value;
    if (product.value === "GettingOut") {
      // customer's name for the start of the notes
      const customer = document.querySelector("#customer-name").value;
      let customerName = customer.split(" ");
      if (customerName[0] === "") {
        customerName[0] = "unknown";
      }
      opening = `as per ${customerName[0]},`;

      // main notes
      noteString = `${document.querySelector("#resolution").value}`;

      // rep initials for end of notes
      const repName = rep.split(" ");
      let repInitials = rep;
      if (repName.length > 1) {
        repInitials = `${repName[0][0]}.${repName[1][0]}.`;
      }

      // current date for end of notes
      const date = new Date();
      const fDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      closing = `${repInitials} ${fDate}`;
    } else if (product.value === "VisManager") {
      opening = `GTL/${rep} -`;
    }

    if (opening) {
      noteString = `${opening} ${noteString}`;
    }

    if (closing) {
      noteString = `${noteString} - ${closing}`;
    }

    copyStr(noteString.replace(/(â€™|â€“|â€œ|â€)/g, ""));
    localStorage.setItem("rep-name", document.querySelector("#rep-name").value);
  });

  if (buttons === true) {
    // hard coded button
    const confluenceLink = document.createElement("a");
    confluenceLink.setAttribute("target", "_blank");
    confluenceLink.setAttribute(
      "href",
      "https://confluence.gtl.net/display/CALL/Training+Center+of+Excellence"
    );
    confluenceLink.innerText = "confluence";
    confluenceLink.setAttribute("id", "confluenceLink");

    const confluenceBtn = document.createElement("button");
    confluenceBtn.setAttribute("type", "button");
    confluenceBtn.appendChild(confluenceLink);
    formButtons.appendChild(confluenceBtn);
    //

    const resetBtn = document.createElement("button");
    resetBtn.setAttribute("type", "button");
    resetBtn.innerText = "reset";
    formButtons.appendChild(resetBtn);

    form.appendChild(formButtons);

    resetBtn.addEventListener("click", () => {
      // resets the items on the form based on data reset
      const a = confirm("Would you like to reset this form?");
      if (a) {
        const resetItems = document.querySelectorAll('[data-reset="reset"]');
        resetItems.forEach((item) => {
          item.value = "";
        });
      }
    });
  }

  return form;
}

const cnForm = createForm(form);
const container = document.getElementById("main-left");
container.appendChild(cnForm);

const version = document.getElementById("version-number");
version.innerText = "22.401";

// top bar
const navLinks = [
  [
    {
      container: "span",
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
      url: "https://www.viapath.com/",
    },
    {
      label: "US DOC List",
      url: "https://en.wikipedia.org/wiki/Lists_of_United_States_state_prisons",
    },
  ],
  [
    {
      container: "span",
      data: "ConnectNetwork",
    },
    {
      label: "Scripts",
      url: "https://confluence.gtl.net/x/Bgp2BQ",
    },
    {
      label: "hcares",
      url: "http://hcares",
    },
    {
      label: "dcares",
      url: "http://dcares",
    },
    {
      label: "research",
      url: "http://hcares/csguide/default.aspx",
    },
    {
      label: "cnbot",
      url: "http://hcares/OCBOT/Default.aspx",
    },
    {
      label: "sharepoint",
      url: "https://gtlcorp.sharepoint.com/BillingCustomerService/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2FBillingCustomerService%2FShared%20Documents%2FForms%2FAllItems%2Easpx",
    },
    {
      label: "command",
      url: "https://ca.gtl.us/Modules/Home/",
    },
  ],
  [
    {
      container: "span",
      data: "GettingOut",
    },
    {
      label: "Scripts",
      url: "https://confluence.gtl.net/x/-i_jBg",
    },
    {
      label: "secure1",
      url: "https://www.intelmate.net/kiosk/login",
    },
    {
      label: "secure2",
      url: "https://secure2.intelmate.com/kiosk/login",
    },
    {
      label: "visitation",
      url: "https://command-center.telmate.com/ui#/main",
    },
    {
      label: "moneygram",
      url: "https://online.moneygram.com/ExpressPaymentIPN/adhocQuery.do?r=t#results",
    },
    {
      label: "verifi",
      url: "https://secure.verifi.com/merchants/login.php",
    },
  ],
  [
    {
      container: "span",
      data: "VisManager",
    },
    {
      label: "Scripts",
      url: "https://confluence.gtl.net/x/gMHzBQ",
    },
    {
      label: "facilities",
      url: "https://confluence.gtl.net/pages/viewpage.action?pageId=97070140",
    },
    {
      label: "visitor support",
      url: "https://gtlcorp-my.sharepoint.com/personal/zachary_leija_gtl_net/_layouts/15/Doc.aspx?sourcedoc={20cea1a5-c41e-4ff7-b61d-bb7bfc751a15}&action=edit&wd=target%28Facility%20info%20template.one%7Cc3f62de1-4cab-43e9-b735-ecfdd915dcc5%2FFacility%20Name%2C%20ST%7C7988597a-6597-4e4b-b3c4-657955f559bb%2F%29",
    },
    {
      label: "ts visitation",
      url: "https://gtlcorp.sharepoint.com/:o:/r/customerservice/_layouts/15/doc2.aspx?sourcedoc=%7B247c7058-ff12-4d5d-ae73-1eaf503c3a70%7D&action=view&wd=target(Customer%20Information%2FMobile%2C%20AL.one%7Cda29e54c-0192-4784-9174-765d58c5a77e%2FVisitor%20Support%20Info%7Ca6a21386-d08e-498b-aecc-1619e29ee449%2F)",
    },
  ],
  /*{
        category: 'general',
        label: '',
        url: '#',
    },*/
];

const savedNotes = (function () {
  const data = ["ConnectNetwork", "GettingOut", "VisManager"];

  const container = document.createElement("div");
  container.classList.add("saved-notes-container");

  for (let i = 0; i < data.length; i += 1) {
    const span = document.createElement("span");
    span.setAttribute("data-product", data[i]);

    const label = document.createElement("label");
    label.innerHTML = `<strong>${data[i]}: </strong>`;
    span.appendChild(label);

    const note = document.createElement("textarea");
    note.setAttribute("id", `${data[i]}-notes`);
    note.innerText = localStorage.getItem(note.id) || "";
    note.addEventListener("keyup", () => {
      localStorage.setItem(note.id, note.value);
    });
    span.appendChild(note);

    container.appendChild(span);
  }

  return container;
})();

const navOther = [
  {
    label: "color",
    element: colorCtrl,
  },
  {
    label: "saved notes",
    element: savedNotes,
  },
];

function createNav(links = "none", other) {
  /* create the containers for the navbar */
  const nav = document.querySelector("nav");
  const menu = document.createElement("ul");
  menu.setAttribute("id", "work-links");
  menu.classList.add("flex-list");
  nav.appendChild(menu);

  function navSection(label) {
    const li = document.createElement("li");
    li.classList.add("dropdown");
    li.setAttribute("data-dropdown", "");
    const button = document.createElement("button");
    button.classList.add("link");
    button.setAttribute("data-dropdown-button", "");
    button.innerText = label;
    const div = document.createElement("div");
    div.classList.add("dropdown-menu");
    li.appendChild(button);
    li.appendChild(div);

    return {
      li,
      button,
      div,
    };
  }

  // create links for the first nav
  if (links !== "none") {
    const linkGroup = navSection("links");

    for (let i = 0; i < links.length; i += 1) {
      const linkSet = document.createElement("span");
      linkSet.classList.add("product-work-links");

      for (let j = 0; j < links[i].length; j += 1) {
        if (links[i][j].data) {
          linkSet.setAttribute("data-product", links[i][j].data);
          linkSet.classList.add("display-none");
        }

        if (links[i][j].url) {
          const a = document.createElement("a");
          a.innerText = links[i][j].label || links[i][j].url;
          a.setAttribute("href", links[i][j].url);
          a.setAttribute("target", "_blank");
          a.classList.add("link");
          linkSet.appendChild(a);
        }
      }

      linkGroup.div.appendChild(linkSet);
      menu.appendChild(linkGroup.li);
    }
  }

  // creates sections for the next tabs
  for (let i = 0; i < other.length; i += 1) {
    const otherGroup = navSection(other[i].label);
    otherGroup.div.appendChild(other[i].element);

    menu.appendChild(otherGroup.li);
  }

  // dropdown function
  document.addEventListener("click", (e) => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]");
    if (!isDropdownButton && e.target.closest("[data-dropdown") != null) return;

    let currentDropDown;
    if (isDropdownButton) {
      currentDropDown = e.target.closest("[data-dropdown]");
      currentDropDown.classList.toggle("active");
    }

    document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
      if (dropdown === currentDropDown) return;
      dropdown.classList.remove("active");
    });
  });

  return nav;
}

const nav = createNav(navLinks, navOther);

// evennt listner for class management
const productSelect = document.querySelector("#product");

function toggleProductDisplay() {
  document.querySelectorAll("[data-product]").forEach((item) => {
    const product = item.getAttribute("data-product");
    const selection = productSelect.value;
    if (product === selection) {
      item.classList.remove("display-none");
    } else {
      item.classList.add("display-none");
    }
  });
}
productSelect.addEventListener("change", () => {
  localStorage.setItem("product", productSelect.value);
  toggleProductDisplay();
  updateIssueList();
});

const issueElm = document.querySelector('[data-copy="issue"]');

function updateConfluenceButton() {
  function createDataObj() {
    const product = productSelect.value;
    const issue = issueElm.value;
    for (key in issueData) {
      if (issueData[key][product]) {
        for (let i = 0; i < issueData[key][product].length; i += 1) {
          if (issueData[key][product][i].label === issue) {
            return {
              disposition: key,
              issue: issue,
              url: issueData[key][product][i].url,
            };
          }
        }
      }
    }
  }

  const issue = createDataObj();

  const confluenceLink = document.querySelector("#confluenceLink");

  if (issue) {
    confluenceLink.href = issue.url;
    confluenceLink.innerText = issue.disposition;
  } else {
    confluenceLink.href =
      "https://confluence.gtl.net/display/CALL/Training+Center+of+Excellence";
    confluenceLink.innerText = "confluence";
  }
}
issueElm.addEventListener("change", updateConfluenceButton);
productSelect.addEventListener("change", updateConfluenceButton);

// local storage
document.getElementById("rep-name").value =
  localStorage.getItem("rep-name") || "";
productSelect.value = localStorage.getItem("product") || "";
toggleProductDisplay();

// datalists
const facList = document.getElementById("fac-list");

function addOptions(list, context) {
  if (list[0]) {
    for (let i = 0; i < list.length; i += 1) {
      const option = document.createElement("option");
      data = list[i] + ` (${context})`;
      option.value = data;
      option.innerText = data;
      facList.appendChild(option);
    }
  } else {
    for (const property in list) {
      for (i = 0; i < list[property].length; i += 1) {
        const data = `${list[property][i]} in ${property}`;
        const option = document.createElement("option");
        option.value = data;
        option.innerText = data;
        facList.appendChild(option);
      }
    }
  }
}

function filterConfluence(filter) {
  const filteredItems = [];
  for (const key in issueData) {
    for (const key2 in issueData[key]) {
      for (let i = 0; i < issueData[key][key2].length; i += 1) {
        if (key2 !== filter) {
          continue;
        }
        if (issueData[key][key2][i].label) {
          filteredItems.push(issueData[key][key2][i]);
        }
      }
    }
  }

  return filteredItems;
}

function updateIssueList() {
  document.querySelector("#issue-list").innerHTML = (function () {
    let dataOptions = "";
    const product = document.querySelector("#product").value;

    let dataList = issueData;

    if (product !== "") {
      dataList = filterConfluence(product);
    }

    for (const key in dataList) {
      if (dataList[key].label) {
        dataOptions += `<option value="${dataList[key].label}">${dataList[key].label}</option>`;
      } else {
        dataOptions += `<option value="${key}">${key}</option>`;
      }
    }

    return dataOptions;
  })();
}

updateIssueList();

addOptions(facData.state);
addOptions(facData.CN, "CN");
addOptions(facData.VM, "VM");
addOptions(facData.GO, "GO");
