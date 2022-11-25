import { faker } from '@faker-js/faker'
import DBClient from "../globalPrisma";

const prisma = DBClient.getInstance().prisma

async function main() {

    const getRandomInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    const numberOfUsers = 15;
    const numberOfTweets = faker.datatype.number({min:0, max: 5})
    const numberOfComments = faker.datatype.number({ min: 0, max: 6 })

    const createComments = (n: any) => {
        return Array.from(Array(n).keys()).map(() => ({
            content: faker.lorem.sentence() || faker.lorem.sentences(),
            image: faker.helpers.arrayElement<string>([faker?.image?.image(), ""]),
            createdAt: faker.date.between('2015-01-01T00:00:00.000Z', '2022-09-23T00:00:00.000Z'),
            userId: faker.helpers.arrayElement<string>(['cl893otp50164swv5qaz4att3', 'cl8c83m8a000609l2y0baip53', 'cl8cpggrg000609jwzcrdpuf5', 'cl8d8gd63001109l88908jw6v'])
        }))
    }

    const createTweets = (n: any) => {
        return Array.from(Array(n).keys()).map(() => ({
            content: faker.lorem.sentence(getRandomInteger(3, 34)),
            image: faker.helpers.arrayElement<string>([faker?.image?.image(), ""]),
            createdAt: faker.date.between('2015-01-01T00:00:00.000Z', '2022-09-23T00:00:00.000Z'),
            comments: {
                create: createComments(numberOfComments)
            }
        }))
    }

    const createUsers = (n: any) => {
        return Array.from(Array(n).keys()).reverse().map(() => ({
            name: faker.name.findName(),
            email: faker.internet.email(),
            image: faker.image.image(),
            tweets: {
                create: createTweets(numberOfTweets)
            },
            Profile: {
                create: {
                tag: faker.name.firstName(),
                avatar: faker.image.avatar(),
                cover: faker.image.image(),
                bio: faker.lorem.paragraph(),
                website: faker.internet.url()
                }
            }
        }))
    }
    

    const users = createUsers(numberOfUsers);
    for (const data of users) {
        const user = await prisma.user.create({ data });
        console.log(`Created user with email: ${user.email}`);
    }
    console.log('Seeding finished.');

}
main()

    .catch((e) => {
        console.error(e);
        process.exit(1);
    })

