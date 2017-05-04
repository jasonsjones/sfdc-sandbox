
export default function () {
    const DEFAULT_PASSWORD = 'p@ssw0rd';
    return {
        getUsers: getUsers,
        mockUsersFromServer: mockUsersFromServer
    };

    function getUsers() {
        return [
            {
                name: {
                    first: 'Clark',
                    last: 'Kent'
                },
                displayName: 'Clark Kent',
                bio: 'The man of steel',
                email: 'clark@dailyplanet.com',
                avatar: 'male3.png',
                local: {
                    username: 'superman',
                    password: DEFAULT_PASSWORD
                },
                admin: true,
                createdDate: new Date('2016-09-12'),
                lastModifiedDate: new Date('2016-10-14')
            },
            {
                name: {
                    first: 'Bruce',
                    last: 'Wayne'
                },
                displayName: 'Bruce Wayne',
                bio: 'Saving Gotham City',
                email: 'bruce@wayneenterprises.com',
                avatar: 'male2.png',
                local: {
                    username: 'batman',
                    password: DEFAULT_PASSWORD
                },
                admin: false,
                createdDate: new Date('2016-09-14'),
                lastModifiedDate: new Date('2016-10-14')
            },
            {
                name: {
                    first: 'Tony',
                    last: 'Stark'
                },
                displayName: 'Tony Stark',
                bio: 'Ironman',
                email: 'tony@starklabs.com',
                avatar: 'avatar6.jpg',
                local: {
                    username: 'ironman',
                    password: DEFAULT_PASSWORD
                },
                admin: true,
                createdDate: new Date('2016-09-17'),
                lastModifiedDate: new Date('2016-10-18')
            },
            {
                name: {
                    first: 'Oliver',
                    last: 'Queen'
                },
                displayName: 'Oliver Queen',
                bio: 'A shipwrecked billionaire turns superhero',
                email: 'oliver@queenconsolidated.com',
                avatar: 'male3.png',
                local: {
                    username: 'arrow',
                    password: DEFAULT_PASSWORD
                },
                admin: true,
                createdDate: new Date('2017-01-20'),
                lastModifiedDate: new Date('2017-02-18')
            },
            {
                name: {
                    first: 'Barry',
                    last: 'Allen'
                },
                displayName: 'Barry Allen',
                bio: 'The Flash',
                email: 'barry@starzlabs.com',
                avatar: 'male6.png',
                local: {
                    username: 'theflash',
                    password: DEFAULT_PASSWORD
                },
                admin: false,
                createdDate: new Date('2016-09-20'),
                lastModifiedDate: new Date('2017-02-18')
            },
            {
                name: {
                    first: 'Bruce',
                    last: 'Banner'
                },
                displayName: 'Bruce Banner',
                bio: 'The Hulk',
                email: 'bruce@pantheon.com',
                avatar: 'male5.png',
                local: {
                    username: 'hulk',
                    password: DEFAULT_PASSWORD
                },
                admin: false,
                createdDate: new Date('2016-10-28'),
                lastModifiedDate: new Date('2016-12-18')
            }
        ];
    }

    function mockUsersFromServer() {
        return [
            {
                "_id": "589e9e5ca8191700221b6a7c",
                "email": "clark@dailyplanet.com",
                "displayName": "Clark Kent",
                "bio": "The man of steel",
                "avatar": "male3.png",
                "createdDate": new Date("2016-09-12T00:00:00Z"),
                "lastModifiedDate": new Date("2016-10-12T00:00:00Z"),
                "admin": true,
                "local": {
                    "username": "superman",
                    "password": "$2a$10$wCci5FgMZ7Yf9GgJLg7im.UtOBi4Qd.VPLBNfYybGbF0FHHtOMYte"
                },
                "name": {
                    "first": "Clark",
                    "last": "Kent",
                    "full": "Clark Kent"
                },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a7d",
                "email": "bruce@wayneenterprises.com",
                "displayName": "Bruce Wayne",
                "bio": "The Hulk",
                "avatar": "male3.png",
                "createdDate": new Date("2016-09-14T00:00:00Z"),
                "lastModifiedDate": new Date("2016-09-14T00:00:00Z"),
                "admin": false,
                "local": {
                    "username": "batman",
                    "password": "$2a$10$nhbHHkm5eCkx4uHNpRvY4u190rqPwJ8ZZ25b9mPtIxBLXm7nN..si"
                },
                "name": {
                    "first": "Bruce",
                    "last": "Wayne",
                    "full": "Bruce Wayne"
                },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a7e",
                "email": "tony@starklabs.com",
                "createdDate": new Date("2016-09-17T00:00:00Z"),
                "admin": true,
                "local": {
                    "username": "ironman",
                    "password": "$2a$10$rjnn11Z5c4cwiB/tk2YwPOKQMYGbyfO4wFL8LcR6d6esqLa3dxl9K"
                },
                "name": {
                    "first": "Tony",
                    "last": "Stark",
                    "full": "Tony Stark"
                },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a7f",
                "email": "oliver@queenconsolidated.com",
                "createdDate": new Date("2017-01-20T00:00:00Z"),
                "admin": true,
                "local": {
                    "username": "arrow",
                    "password": "$2a$10$OyZl5E.q/xTvLh1I/OdjQ.kGYAD.MNxyPjYq2/CXaqNFWyZPzaXSm"
                },
                "name": {
                    "first": "Oliver",
                    "last": "Queen", "full": "Oliver Queen"
                },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a80",
                "email": "barry@starzlabs.com",
                "createdDate": new Date("2016-09-20T00:00:00Z"),
                "admin": false,
                "local": {
                    "username": "theflash",
                    "password": "$2a$10$oOazEWVklMhcnikwKkEA5OhRNJl6dHZuXYbe.owl6jkFvJXob3oQO"
                },
                "name": {
                    "first": "Barry",
                    "last": "Allen",
                    "full": "Barry Allen"
                },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a81",
                "email": "bruce@pantheon.com",
                "createdDate": new Date("2016-10-28T00:00:00Z"),
                "admin": false,
                "local": {
                    "username": "hulk",
                    "password": "$2a$10$0p/yNWUxFfXhLY/Er/M6kOQj0qvWfXqLcCnWMDSMmyCjdzDwwNuNO"
                },
                "name": {
                    "first": "Bruce",
                    "last": "Banner",
                    "full": "Bruce Banner"
                },
                "__v": 0
            },
            {
                "_id": "58abc0924f049f00e8823d20",
                "email": "dig@queenconsolidated.com",
                "createdDate": new Date("2017-02-21T04:16:43.529Z"),
                "admin": false,
                "local": {
                    "username": "spartan",
                    "password": "$2a$10$2Goy2M6LkbffaJOFDCUOWuoHviEvMjVEMgu7KfDVwEXn0vG1HVWTO"
                },
                "name": {
                    "first": "John",
                    "last": "Diggle",
                    "full": "John Diggle"
                },
                "__v": 0
            }
        ];
    }
}
