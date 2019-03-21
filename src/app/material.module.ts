
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatStepperModule, MatBadgeModule, MatBottomSheetModule,
  MatExpansionModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatChipsModule,
    MatOptionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatExpansionModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatChipsModule,
    MatOptionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatStepperModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatExpansionModule,
  ],
  providers: [
    // snack bar
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        panelClass: 'white-bg',
        verticalPosition: 'top'
      }
    }
  ]
})
export class AppMaterialModule { }