import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'fournisseurs' })
class Fournisseur extends Model {
  @Column({
    type: DataType.STRING,
  })
  nom!: string;
  @Column({
    type: DataType.STRING,
  })
  email!: string;
  @Column({
    type: DataType.STRING,
  })
  prenom!: string;

  @Column({
    type: DataType.STRING,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
  })
  role!: string;

  @Column({
    type: DataType.STRING,
  })
  password!: string;
}

export { Fournisseur };