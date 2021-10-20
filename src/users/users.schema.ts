import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  @IsPositive()
  age: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  readonly readOnlyData: {
    id: string;
    name: string;
    email: string;
    age: number;
  };
}

const tempUserSchema = SchemaFactory.createForClass(User);
tempUserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    age: this.age,
  };
});

export const UserSchema = tempUserSchema;
