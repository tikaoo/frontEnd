import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule,Routes } from '@angular/router'


const routes: Routes = [
    {
        path:'funcionario',
        loadChildren: () => import ('./modulos/funcionario.module').then(m =>m.FuncionarioModule)
    },
    {

         path: 'servicos',
        loadChildren: () => import('./modulos/servicos.module')
        .then(m => m.ServicosModule)

    },
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
    },

]

@NgModule({
    declarations: [],
    imports:[
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports:[
    RouterModule
    ],
    providers: []
})
export class AppRoutingModule {}
