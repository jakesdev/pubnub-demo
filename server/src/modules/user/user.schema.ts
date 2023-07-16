import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SignUpType } from 'src/common/user-type.enum';

@Schema()
export class User extends Document {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: String })
  signUpType?: SignUpType;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
