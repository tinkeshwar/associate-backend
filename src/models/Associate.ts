import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  DataTypes,
  Model
} from 'sequelize'
import sequelize from '../config/database'
import { AutoDate, Column, Entity, Nullable, PrimaryKey } from '../utilities/SequelizeDecorator'
import Specialization from './Specialization';

@Entity('associates', { sequelize })
class Associate extends Model {
  public static associations: {
      specializations: Association<Associate, Specialization>;
  };

  @PrimaryKey()
  public id!: number;

  @Column(DataTypes.STRING)
  public name!: string;

  @Column(DataTypes.BIGINT)
  public phone!: number;

  @Nullable
  @Column(DataTypes.TEXT)
  public address?: string;

  @Nullable
  @Column(DataTypes.BOOLEAN)
  public status?: boolean;

  @AutoDate()
  public readonly createdAt!: Date;

  @AutoDate()
  public readonly updatedAt!: Date;

  public readonly specializations?: Specialization[];

  public getSpecializations!: BelongsToManyGetAssociationsMixin<Specialization>;
  public setSpecialization!: BelongsToManyAddAssociationMixin<Specialization, number>;
  public addSpecialization!: BelongsToManyAddAssociationMixin<Specialization, number>;
  public hasSpecialization!: BelongsToManyHasAssociationMixin<Specialization, number>;
  public countSpecializations!: BelongsToManyCountAssociationsMixin;
  public createSpecialization!: BelongsToManyCreateAssociationMixin<Specialization>;
  public removeSpecialization!: BelongsToManyRemoveAssociationMixin<Specialization, number>;
  public removeSpecializations!: BelongsToManyRemoveAssociationsMixin<Specialization, number>;

  public toJSON (): Record<string, any> {
    const associate = this.get('', { plain: true }) as Record<string, any>
    return associate
  }
}

Associate.belongsToMany(Specialization, {
  as: 'specializations',
  through: 'associate_specialization',
  foreignKey: 'associate_id',
  otherKey: 'specialization_id'
})

export default Associate
