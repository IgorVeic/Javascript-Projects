import { SalesProdService } from './src/sales-products-service.js';

const salesPage = new SalesProdService();
await salesPage.createFirstCategoryPage();

salesPage.categoryEvents();
