import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Menu } from './menu.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { MenuDto } from './menu.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {}

  private logger = new Logger('RoleService')

  public async createMenu(dto: MenuDto) {
    await this.menuRepository.save(Object.assign(new Menu(), dto))

    return {
      code: HttpStatus.OK,
    }
  }

  public async editMenu(dto: MenuDto) {
    await this.menuRepository.update(dto.id, dto)

    return {
      code: HttpStatus.OK,
    }
  }

  public async deleteMenu(id: number) {
    await this.menuRepository.delete(id)

    return {
      code: HttpStatus.OK,
    }
  }

  public async menuDetail(id: number) {
    const role = await this.menuRepository.findOne({ id })
    return {
      code: HttpStatus.OK,
      role,
    }
  }

  public async menuList(params: PaginationDto) {
    const menus = await this.menuRepository
      .createQueryBuilder('c')
      .where('c.name like :name')
      .setParameters({
        name: `%${params.keywords ? params.keywords : ''}%`, // 用户名模糊查询
      })
      .orderBy('c.id', 'DESC')
      .skip(params.page)
      .take(params.pageSize)
      .getManyAndCount()

    return {
      code: HttpStatus.OK,
      data: menus[0],
      total: menus[1],
    }
  }
}
