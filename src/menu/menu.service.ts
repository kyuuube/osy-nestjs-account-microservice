import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Menu } from './menu.entity'
import { UserRole } from '../auth/entity/user.role.entity'
import { Role } from '../role/role.entity'
import { Repository, TreeRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { MenuDto } from './menu.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
import snowflake from '../common/snowflake'
import { uniqBy } from 'lodash'
import { buildTreeList } from 'src/common/uitls/buildTree'

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
        @InjectRepository(Menu)
        private readonly treeRepository: TreeRepository<Menu>,

        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>,

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
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
            code: HttpStatus.OK
        }
    }

    public async editMenu(dto: MenuDto) {
        await this.menuRepository.update(dto.id, dto)

        return {
            code: HttpStatus.OK
        }
    }

    public async deleteMenu(id: string) {
        await this.menuRepository.delete(id)

        return {
            code: HttpStatus.OK
        }
    }

    public async menuDetail(id: string) {
        const role = await this.menuRepository.findOne({ id })
        console.log(role)
        return {
            code: HttpStatus.OK,
            role
        }
    }

    public async menuList(params: PaginationDto) {
        const menus = await this.menuRepository
            .createQueryBuilder('c')
            .where('c.name like :name')
            .setParameters({
                name: `%${params.keywords ? params.keywords : ''}%` // 用户名模糊查询
            })
            .orderBy('c.id', 'DESC')
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .getManyAndCount()

        this.logger.log(menus)
        return {
            code: HttpStatus.OK,
            data: menus[0],
            total: menus[1]
        }
    }

    public async menuTree() {
        const tree = await this.treeRepository.findTrees()
        this.logger.log(tree)
        return {
            data: tree,
            code: HttpStatus.OK
        }
    }

    public async getMenu(user: any) {
        const roleList = await this.userRoleRepository.find({
            where: { userId: user.id }
        })
        const menuList = await this.roleRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.menus', 'menu')
            .getMany()

        const list = menuList.filter(i => roleList.some(r => r.roleId === i.id))

        let tempList: any[] = []

        list.forEach(i => {
            tempList = [...tempList, ...i.menus]
        })

        tempList = uniqBy(tempList, 'id')

        const tree = buildTreeList(tempList)

        return {
            tree,
            code: HttpStatus.OK
        }
    }
}
