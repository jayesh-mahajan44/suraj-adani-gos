import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'user-management',
    loadChildren: () => import('src/app/pages/user-management-page/user-management-page.module').then(m => m.UserManagementPageModule)
  },
  {
    path: 'truck-management',
    loadChildren: () => import('src/app/pages/truck-management-page/truck-management-page.module').then(m => m.TruckManagementPageModule)
  },
  {
    path: 'driver-master',
    loadChildren: () => import('src/app/pages/driver-master-page/driver-master-page.module').then(m => m.DriverMasterPageModule)
  },
  {
    path: 'in-survey/capture-images',
    loadChildren: () => import('src/app/pages/image-capturing-screen/image-capturing-screen.module').then(m => m.ImageCapturingScreenModule)
  },
  {
    path:"in-survey/images-capture",
    loadChildren: () => import('src/app/pages/image-capture-component/image-capture.module').then(m =>m.ImageCaptureModuleModule)
  },
  {
    path: 'truck-driver-mapping',
    loadChildren: () => import('src/app/pages/truck-driver-mapping-page/truck-driver-mapping-page.module').then(m => m.TruckDriverMappingPageModule)
  },
  {
    path: 'in-survey/truck-transaction-mapping',
    loadChildren: () => import('src/app/pages/in-survey-page/truck-transaction-mapping-page/truck-transaction-mapping-page.module').then(m => m.TruckTransactionMappingPageModule)
  },
  {
    path: 'in-survey/import-transaction-mapping',
    loadChildren: () => import('src/app/pages/in-survey-page/import-transaction-mapping-page/import-transaction-mapping-page.module').then(m => m.ImportTransactionMappingPageModule)
  },
  {
    path: 'in-survey/export-transaction-mapping',
    loadChildren: () => import('src/app/pages/in-survey-page/export-transaction-mapping-page/export-transaction-mapping-page.module').then(m => m.ExportTransactionMappingPageModule)
  },
  {
    path: 'in-survey/transaction-summary-page',
    loadChildren: () => import('src/app/pages/in-survey-page/transaction-summary-page/transaction-summary-page.module').then(m => m.TransactionSummaryPageModule)
  },
  {
    path: 'in-gate',
    loadChildren: () => import('src/app/pages/in-gate/in-gate.module').then(m => m.InGateModule)
  },
  {
    path: 'out-gate',
    loadChildren: () => import('src/app/pages/out-gate/out-gate.module').then(m =>m.OutGateModule)
  },
  {
    path: 'damage-inspection-management-system',
    loadChildren: () => import('src/app/pages/damage-inspection-management-system/damage-inspection-management-system.module').then(m => m.DamageInspectionManagementSystemModule)
  },
  {
    path: 'damage-inspection-management-system1',
    loadChildren: () => import('src/app/pages/damage-inspection-management-system1/damage-inspection-management-system1.module').then(m => m.DamageInspectionManagementSystem1Module)
  }
  
];