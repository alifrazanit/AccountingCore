import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsController } from '@controllers/master/accounts/accounts.controller';
import { MCustomerController } from '@controllers/master/m-customer/m-customer.controller';
import { MSupplierController } from '@controllers/master/m-supplier/m-supplier.controller';
import { GroupProductController } from '@controllers/master/group_product/group_product.controller';
import { DepartmentController } from '@controllers/master/department/department.controller';
import { MTaxController } from '@controllers/master/m-tax/m-tax.controller';
import { MUserController } from '@controllers/master/m-user/m-user.controller';
import { MUomController } from '@controllers/master/m-uom/m-uom.controller';
import { ProductsController } from '@controllers/master/products/products.controller';
import { SubdepartmentController } from '@controllers/master/subdepartment/subdepartment.controller';

import { AuthModule } from '@modules/auth/auth.module';

import { UtilsService } from '@utils/utils.service';
import { MUsersService } from '@services/master/m-users/m-users.service';
import { AccountsService } from '@services/master/accounts/accounts.service';
import { MCustomerService } from '@services/master/m-customer/m-customer.service';
import { MSupplierService } from '@services/master/m-supplier/m-supplier.service';
import { GroupProductService } from '@services/master/group_product/group_product.service';
import { MDepartmentService } from '@services/master/m-department/m-department.service';
import { MTaxService } from '@services/master/m-tax/m-tax.service';
import { MUomService } from '@services/master/m-uom/m-uom.service';
import { ProductsService } from '@services/master/products/products.service';
import { SubdepartmentService } from '@services/master/subdepartment/subdepartment.service';

import { mAccountsRepository } from '@repository/m_accounts.repository';
import { mCustomerRepository } from '@repository/m_customer.repository';
import { mSupplierRepository } from '@repository/m_supplier.repository';
import { groupProductRepository } from '@repository/group_product.repository';
import { mDepartmentRepository } from '@repository/m_department.repository';
import { mTaxRepository } from '@repository/m_tax.repository';
import { mUsersRepository } from '@repository/m_users.repository';
import { mUomRepository } from '@repository/m-uom.repository';
import { mProductsRepository } from '@repository/m-products.repository';
import { mSubDepartmentRepository } from '@repository/m-subdep.repository';


import { m_users } from '@entities/m_users.entity';
import { m_customer } from '@entities/m_customer.entity';
import { m_accounts } from '@entities/m_accounts.entity';
import { m_supplier } from '@entities/m_supplier.entity';
import { m_uom } from '@entities/m_uom.entity';
import { m_products } from '@entities/m_products.entity';
import { m_subdepartement } from '@entities/m_subdepartment.entity';




@Module({
    imports: [
        TypeOrmModule.forFeature([
            m_accounts,
            m_users,
            m_customer,
            m_supplier,
            m_uom,
            m_products,
            m_subdepartement
        ]),
        AuthModule
    ],
    controllers:[ 
        AccountsController,
        MCustomerController,
        MSupplierController,
        GroupProductController,
        DepartmentController,
        MUserController,
        MTaxController,
        MUomController,
        ProductsController,
        SubdepartmentController
    ],
    providers: [ 
        mCustomerRepository,
        mAccountsRepository,
        mSupplierRepository,
        groupProductRepository,
        mDepartmentRepository,
        mUsersRepository,
        mTaxRepository,
        mUomRepository,
        mProductsRepository,
        mSubDepartmentRepository,
        AccountsService,
        MCustomerService,
        MUsersService,
        UtilsService,
        MSupplierService,
        GroupProductService,
        MDepartmentService,
        MTaxService,
        MUomService,
        ProductsService,
        SubdepartmentService
    ],
    exports: [ 
        AccountsService,
        MCustomerService,
        MUsersService,
        MSupplierService,
        mUsersRepository,
        mUomRepository,
        mCustomerRepository,
        mAccountsRepository,
        mSupplierRepository,
        groupProductRepository,
        mDepartmentRepository,
        mTaxRepository,
        mProductsRepository,
        mSubDepartmentRepository,
        UtilsService
    ]
})
export class MasterModule {}
