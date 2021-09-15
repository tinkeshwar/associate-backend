import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { AutoDate, Column, Entity, Nullable, PrimaryKey, Unique } from '../utilities/SequelizeDecorator'

@Entity('specializations', { sequelize })
class Specialization extends Model {
  @PrimaryKey()
  public id!: number;

  @Unique
  @Column(DataTypes.STRING)
  public name?: string;

  @Nullable
  @Column(DataTypes.BOOLEAN)
  public status?: boolean;

  @AutoDate()
  public readonly createdAt!: Date;

  @AutoDate()
  public readonly updatedAt!: Date;

  public toJSON (): Record<string, any> {
    const Specialization = this.get('', { plain: true }) as Record<string, any>
    return Specialization
  }
}

export default Specialization
