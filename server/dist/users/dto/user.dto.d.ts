import { EducationInfoDto } from './education-info.dto';
import { NotificationOptionDto } from './notification-option.dto';
import { SocialLinkDto } from './social-link.dto';
export declare class UserDto {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    bio: string;
    locationId: string;
    locationPreference: string;
    timePreference: string;
    token: string;
    resetCode: string;
    verificationCode: string;
    socialLinks: SocialLinkDto[];
    notificationPreference: NotificationOptionDto[];
    gender: string;
    age: number;
    skills: string[];
    education: EducationInfoDto[];
    isActive?: boolean;
}
