
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
                email: 'clark@dailyplanet.com',
                local: {
                    username: 'superman',
                    password: DEFAULT_PASSWORD
                },
                admin: true,
                createdDate: new Date('2016-09-12')
            },
            {
                name: {
                    first: 'Bruce',
                    last: 'Wayne'
                },
                email: 'bruce@wayneenterprises.com',
                local: {
                    username: 'batman',
                    password: DEFAULT_PASSWORD
                },
                admin: false,
                createdDate: new Date('2016-09-14')
            },
            {
                name: {
                    first: 'Tony',
                    last: 'Stark'
                },
                email: 'tony@starklabs.com',
                local: {
                    username: 'ironman',
                    password: DEFAULT_PASSWORD
                },
                admin: true,
                createdDate: new Date('2016-09-17')
            },
            {
                name: {
                    first: 'Oliver',
                    last: 'Queen'
                },
                email: 'oliver@queenconsolidated.com',
                local: {
                    username: 'arrow',
                    password: DEFAULT_PASSWORD
                },
                admin: true,
                createdDate: new Date('2017-01-20')
            },
            {
                name: {
                    first: 'Barry',
                    last: 'Allen'
                },
                email: 'barry@starzlabs.com',
                local: {
                    username: 'theflash',
                    password: DEFAULT_PASSWORD
                },
                admin: false,
                createdDate: new Date('2016-09-20')
            },
            {
                name: {
                    first: 'Bruce',
                    last: 'Banner'
                },
                email: 'bruce@pantheon.com',
                local: {
                    username: 'hulk',
                    password: DEFAULT_PASSWORD
                },
                admin: false,
                createdDate: new Date('2016-10-28')
            }
        ];
    }

    function mockUsersFromServer() {
        return [
            {
                "_id": "589e9e5ca8191700221b6a7c",
                "email": "clark@dailyplanet.com",
                "createdDate": new Date("2016-09-12T00:00:00Z"),
                "admin": true,
                "local": { "username": "superman", "password": "$2a$10$wCci5FgMZ7Yf9GgJLg7im.UtOBi4Qd.VPLBNfYybGbF0FHHtOMYte" },
                "name": { "first": "Clark", "last": "Kent" },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a7d",
                "email": "bruce@wayneenterprises.com",
                "createdDate": new Date("2016-09-14T00:00:00Z"),
                "admin": false,
                "local": { "username": "batman", "password": "$2a$10$nhbHHkm5eCkx4uHNpRvY4u190rqPwJ8ZZ25b9mPtIxBLXm7nN..si" },
                "name": { "first": "Bruce", "last": "Wayne" },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a7e",
                "email": "tony@starklabs.com",
                "createdDate": new Date("2016-09-17T00:00:00Z"),
                "admin": true,
                "local": { "username": "ironman", "password": "$2a$10$rjnn11Z5c4cwiB/tk2YwPOKQMYGbyfO4wFL8LcR6d6esqLa3dxl9K" },
                "name": { "first": "Tony", "last": "Stark" },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a7f",
                "email": "oliver@queenconsolidated.com",
                "createdDate": new Date("2017-01-20T00:00:00Z"),
                "admin": true,
                "local": { "username": "arrow", "password": "$2a$10$OyZl5E.q/xTvLh1I/OdjQ.kGYAD.MNxyPjYq2/CXaqNFWyZPzaXSm" },
                "name": { "first": "Oliver", "last": "Queen" },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a80",
                "email": "barry@starzlabs.com",
                "createdDate": new Date("2016-09-20T00:00:00Z"),
                "admin": false,
                "local": { "username": "theflash", "password": "$2a$10$oOazEWVklMhcnikwKkEA5OhRNJl6dHZuXYbe.owl6jkFvJXob3oQO" },
                "name": { "first": "Barry", "last": "Allen" },
                "__v": 0
            },
            {
                "_id": "589e9e5ca8191700221b6a81",
                "email": "bruce@pantheon.com",
                "createdDate": new Date("2016-10-28T00:00:00Z"),
                "admin": false, "local": { "username": "hulk", "password": "$2a$10$0p/yNWUxFfXhLY/Er/M6kOQj0qvWfXqLcCnWMDSMmyCjdzDwwNuNO" },
                "name": { "first": "Bruce", "last": "Banner" },
                "__v": 0
            },
            {
                "_id": "58abc0924f049f00e8823d20",
                "email": "dig@queenconsolidated.com",
                "createdDate": new Date("2017-02-21T04:16:43.529Z"),
                "admin": false,
                "local": { "username": "spartan", "password": "$2a$10$2Goy2M6LkbffaJOFDCUOWuoHviEvMjVEMgu7KfDVwEXn0vG1HVWTO" },
                "name": { "first": "John", "last": "Diggle" },
                "__v": 0
            }
        ];
    }
}
