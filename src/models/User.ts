import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { Movement } from "./Movement";

@Table({
  tableName: "users",
  timestamps: true, // Optional: Add timestamps if you want createdAt and updatedAt fields
})
export class User extends Model {
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

  @HasMany(() => Movement)
  movements!: Movement[];
}
