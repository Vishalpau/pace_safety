let module_icon = require('../../../public/images/module_icon.png');

module.exports = [
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
    key: "assessments",
    name: "Assessments",
    icon: "ion-ios-clipboard",
    multilevel: true,
    child: [
      {
        key: 'flha',
        name: 'FLHA',
        linkParent: "/app/pages/assesments/xflha",
      },
      {
        key: 'aha',
        name: 'AHA',
        linkParent: '/app/pages/aha',
      },
      {
        key: 'jha',
        name: 'JSA',
        linkParent: "/app/pages/jha/all_jha",
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
    key: "controltower",
    name: "Control Tower",
    icon: "ion-ios-body",
    multilevel: false,
    linkParent: "/app/pages/control-tower/controltower-icare",
  },
  // {

  //   key: 'administration',
  //   name: 'Administration',
  //   multilevel: true,
  //   icon: 'ion-ios-cog',
  //   child: [
  //     {
  //       key: 'pick_lists',
  //       name: 'Pick Lists',
  //       linkParent: '#',
  //     },
  //     {
  //       key: 'check_lists',
  //       name: 'Check Lists',
  //       linkParent: '/app/pages/checklist/',
  //     },
  //     {
  //       key: 'xflha_setting',
  //       name: 'X-FLHA Setting',
  //       linkParent: '/app/pages/assesments/FlhaConfig',
  //     },
  //     {
  //       key: 'setting',
  //       name: 'Setting',
  //       linkParent: '/app/settings/setting',
  //     },
  //   ],
  // },
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
