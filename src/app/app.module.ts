import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HealthTipsListContainerComponent } from './pages/health-tips-list-container/health-tips-list-container.component';
import { HealthTipDetailContainerComponent } from './pages/health-tip-detail-container/health-tip-detail-container.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ROOT_REDUCER } from 'src/state/app.state';
import { HealthTipsEffects } from 'src/state/effects/health-tips.effects';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTipModalComponent } from './components/create-tip-modal/create-tip-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HealthTipsListContainerComponent,
    HealthTipDetailContainerComponent,
    NotFoundPageComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    SearchBarComponent,
    CreateTipModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCER),
    EffectsModule.forRoot([HealthTipsEffects]),
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
