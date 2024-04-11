import { Controller} from '@nestjs/common';
import { NotificationServiceService } from './services';
import { NotificationServiceController, SendNotificationRequest, SendNotificationResponse } from '@app/common/proto/notification';
import { Observable } from 'rxjs';

@Controller()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) { }
  sendNotification(request: SendNotificationRequest): SendNotificationResponse | Promise<SendNotificationResponse> | Observable<SendNotificationResponse> {
    throw new Error('Method not implemented.');
  }
}
