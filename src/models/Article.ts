import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'articles' })
export class Article extends Model {
  @Column({
    type: DataType.STRING,
 
  })
  name!: string;

  @Column({
    type: DataType.STRING,
  
  })
  code!: string;

  @Column({
    type: DataType.INTEGER,

    defaultValue: 0
  })
  qte!: number;
}

