import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthTipDetailContainerComponent } from './pages/health-tip-detail-container/health-tip-detail-container.component';
import { HealthTipsListContainerComponent } from './pages/health-tips-list-container/health-tips-list-container.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'health-tips', component: HealthTipsListContainerComponent },
  { path: 'health-tip/:id', component: HealthTipDetailContainerComponent },
  { path: '', redirectTo: '/health-tips', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
