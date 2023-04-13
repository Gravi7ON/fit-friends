import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from '@backend/shared-types';
import { WorkoutSubscriberModel } from './models/workout-subscriber.model';

@Injectable()
export class WorkoutSubscriberRepository {
  constructor(
    @InjectModel(WorkoutSubscriberModel.name)
    private readonly workoutSubscriberModel: Model<WorkoutSubscriberModel>
  ) {}

  public async create(item: Subscriber): Promise<Subscriber> {
    const newEmailSubscriber = new this.workoutSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(email: string): Promise<void> {
    this.workoutSubscriberModel.deleteMany({ email }).exec();
  }

  public async findAllUserSubscribes(email: string): Promise<Subscriber[]> {
    return this.workoutSubscriberModel.find({ email }).exec();
  }

  public async findCoachSubscribers(coachId: string): Promise<Subscriber[]> {
    return this.workoutSubscriberModel
      .find({ subscribeCoachId: coachId })
      .exec();
  }

  public async findByEmailAndCoachId(
    email: string,
    subscribeCoachId: string
  ): Promise<Subscriber | null> {
    return this.workoutSubscriberModel
      .findOne({ email, subscribeCoachId })
      .exec();
  }

  public async findSubscribers(): Promise<Subscriber[] | null> {
    return this.workoutSubscriberModel.find({}).exec();
  }
}
