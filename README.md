# [NATUBLEND-API](https://natublend.netlify.app/)

![Express](https://img.shields.io/badge/Made%20with-Express-1ED760) ![VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f) 

![natublend-website](https://i.imgur.com/kZl0kGe.png)

🎉 I'm thrilled to have created my first backend project! 🙌🏻 Using Express and MongoDB, I was able to build a RESTful API that enables clients to interact with my server using HTTP requests. It supports CRUD operations on my MongoDB database and I'm proud to have designed an API that is scalable and performant. 🚀 I learned a lot through the process and look forward to building more complex backend projects in the future. 💪🏻

---

## Documentation

### Get all drinks/Create drink

Allowed methods: `GET` `POST`

`GET`: returns a list of drinks for a specific search query

`POST`: Creates a new drink

Path: [https://natublend.cyclic.app/api/v1/drinks](https://natublend.cyclic.app/api/v1/drinks)

### Parameters

|Parameter|Required|Description|
|---|---|---|
|fieldName|No|Filters only the drinks with that [fieldName] value `variant=regular`|   
|fieldName+[operator]|No|Filters the drinks with (greater, less, equal...) value than the [fieldName] `price[gt]=4`|
sort|No|Sorts all drinks `sort=price, createdAt`| 
fields|No|You get only the fields you set `fields=price, title, color`|
page|No|You get only the fields you set `fields=price, title, color`|

Example url: [https://natublend.cyclic.app/api/v1/drinks?variant=regular&price[gte]=5&sort=price,createdAt&fields=price,color,title,createdAt&page=1&limit=5]( https://natublend.cyclic.app/api/v1/drinks?variant=regular&price[gte]=5&sort=price,createdAt&fields=price,color,title,createdAt&page=1&limit=5)

### Get Drink/Create Drink/Update Drink

Allowed methods: `GET` `DELETE` `PATCH`

`GET`: returns drink

`DELETE`: deletes drink

`PATCH`: updates drink

Example url: [https://natublend.cyclic.app/api/v1/drinks/6396079bf88ffe0d5d0bd799](https://natublend.cyclic.app/api/v1/drinks/6396079bf88ffe0d5d0bd799)

### Parameters

|Parameter|Required|Description|
|---|---|---|
|id|Yes|The ID of drink|   
 








