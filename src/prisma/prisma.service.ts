import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'mongodb+srv://ravitest:ravi@cluster0.iqxhh.mongodb.net/db1'
                },
            },
        })
    }
}
