import { AuthenticationModule } from './modules/authentication/authentication.module'
import { AwsS3Module } from './modules/aws-s3/aws-s3.module'
import { HeathModule } from './modules/health/heath.module'
import { Module } from '@nestjs/common'
// import { RootModule } from './modules/root/root.module'
import { ExampleModule } from './modules/example/example.module'

@Module({
  imports: [
    AwsS3Module,
    HeathModule,
    AuthenticationModule,
    // RootModule,
    ExampleModule
  ],
})
export class AppModule { }
