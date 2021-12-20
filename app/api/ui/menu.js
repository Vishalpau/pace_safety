let module_icon = require('../../../public/images/module_icon.png');
import { APPCODE, adminUser_Dev, adminUser_Prod } from "../../utils/constants"

var menu = [
  {
    key: 'home',
    name: 'Home',
    icon: 'ion-ios-home',
    multilevel: false,
    linkParent: '/',
  },
  {
    key: "incident-management",
    name: "Incident Management",
    icon: "ion-md-warning",
    multilevel: false,
    linkParent: "/incidents/",
  },
  {
    key: 'compliance',
    name: 'Compliance',
    icon: "ion-ios-list-box",
    multilevel: false,
    linkParent: "/app/pages/compliance",
  },
  {
    key: "assessments",
    name: "Assessments",
    icon: "ion-ios-clipboard",
    multilevel: true,
    child: [
      {
        key: 'flha',
        name: 'FLHA',
        link: "/app/pages/assesments/xflha",
      },
      {
        key: 'jha',
        name: 'JSA',
        link: "/app/pages/jha/all_jha",
      },
      {
        key: 'aha',
        name: 'AHA',
        link: '/app/pages/aha',
      },
    ],
  },
  {
    key: "icare",
    name: "iCare",
    icon: 'ion-md-eye',
    linkParent: '/app/icare',
  },
  {
    key: "controlTower",
    name: "Control Tower",
    icon: "ion-ios-body",
    multilevel: false,
    linkParent: "/app/pages/control-tower/controltower-icare",
  },

  // {
  //   key: "menu-level",
  //   name: "Incident",
  //   icon: "ion-ios-document-outline",
  //   multilevel: false,
  //   linkParent:
  //     "/app/incident-management/registration/initial-notification/incident-details/",
  // },
  // {
  //   key: "no_child",
  //   name: "listIncident",
  //   icon: "ion-ios-checkbox",
  //   linkParent: "/app/pages/Incident/",
  // },
];


if (localStorage.getItem('userDetails') != null && localStorage.getItem('company') != null) {
  let currentUserRole = JSON.parse(localStorage.getItem('userDetails'))
    .companies.filter(company => company.companyId == JSON.parse(localStorage.getItem('company')).fkCompanyId)
  [0].subscriptions.filter(subscription => subscription.appCode == APPCODE)
  [0].roles[0].name
  if (currentUserRole == adminUser_Dev || currentUserRole == adminUser_Prod) {
    menu.push(
      {
        key: 'administration',
        name: 'Administration',
        multilevel: true,
        icon: 'ion-ios-cog',
        child: [
          {
            key: 'pick_lists',
            name: 'Pick Lists',
            linkParent: '/app/pages/picklist',
          },
          {
            key: 'check_lists',
            name: 'Check Lists',
            linkParent: '/app/pages/checklist/',
          },
          // {
          //   key: 'xflha_setting',
          //   name: 'X-FLHA Setting',
          //   linkParent: '/app/pages/assesments/FlhaConfig',
          // },
          // {
          //   key: 'setting',
          //   name: 'Setting',
          //   linkParent: '/app/settings/setting',
          // },
        ],
      },
    )
  }
}

export default menu;