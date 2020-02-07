import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Menu } from './menu.entity'
import { Repository, TreeRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { MenuDto } from './menu.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
import snowflake from '../common/snowflake'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Menu)
    private readonly treeRepository: TreeRepository<Menu>
  ) {}

  private logger = new Logger('MenuService')

  public async createMenu(dto: MenuDto) {
    const snowflakeId: string = snowflake.generate()
    dto.id = snowflakeId
    let newMenu: Menu = Object.assign(new Menu(), dto)
    if (dto?.parentId && dto.parentId) {
      const parentDto = await this.menuRepository.findOne(dto.parentId)
      const parent = Object.assign(new Menu(), parentDto)
      newMenu = Object.assign(new Menu(), dto)
      newMenu.parent = parent
    }
    await this.menuRepository.save(Object.assign(new Menu(), newMenu))

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

  public async deleteMenu(id: string) {
    await this.menuRepository.delete(id)

    return {
      code: HttpStatus.OK,
    }
  }

  public async menuDetail(id: string) {
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

  public async menuTree() {
    const tree = await this.treeRepository.findTrees()

    return {
      data: tree,
      code: HttpStatus.OK,
    }
  }
}
