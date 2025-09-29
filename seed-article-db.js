"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var mongodb_1 = require("mongodb");
require("dotenv/config");
function addArticleField() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, productsCollection, existingProducts, bulkUpdateOps, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    client = new mongodb_1.MongoClient(process.env.DELIVERY_SHOP_DB_URL);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    console.log('Соединение с MongoDB установлено');
                    db = client.db(process.env.DELIVERY_SHOP_DB_NAME);
                    productsCollection = db.collection('products');
                    return [4 /*yield*/, productsCollection.find({}).toArray()];
                case 2:
                    existingProducts = _a.sent();
                    console.log("\u041D\u0430\u0439\u0434\u0435\u043D\u043E ".concat(existingProducts.length, " \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0434\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"));
                    bulkUpdateOps = existingProducts.map(function (product) {
                        // Генерируем шестизначное число с ведущими нулями
                        var articleNumber = faker_1.faker.number.int({ min: 0, max: 999999 });
                        var article = articleNumber.toString().padStart(6, '0');
                        return {
                            updateOne: {
                                filter: { _id: product._id },
                                update: {
                                    $set: {
                                        article: article
                                    }
                                }
                            }
                        };
                    });
                    if (!(bulkUpdateOps.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, productsCollection.bulkWrite(bulkUpdateOps)];
                case 3:
                    result = _a.sent();
                    console.log("\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E ".concat(result.modifiedCount, " \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432"));
                    console.log('Добавлено поле article с шестизначными номерами');
                    return [3 /*break*/, 5];
                case 4:
                    console.log('Нет продуктов для обновления');
                    _a.label = 5;
                case 5: return [4 /*yield*/, client.close()];
                case 6:
                    _a.sent();
                    console.log('Разорвано соединение с MongoDB');
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Ошибка:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
addArticleField();
// Команды для запуска: npx tsc seed-article-db.ts // node seed-article-db.js
