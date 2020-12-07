import User from "./User";

let userJson = {
  "id": 1,
  "createdDate": "2018-04-12T13:27:00.354+0000",
  "lastModifiedDate": "2018-04-12T13:27:00.354+0000",
  "uuid": "ecb8a832-e683-42c2-aa16-80316524082f",
  "inactive": false,
  "email": "petmongrels@gmail.com",
  "firstName": "Vivek",
  "lastName": "Singh",
  "roleIds": [
    1,
    3,
    5
  ],
  "privileges": [
    {
      "id": 16,
      "createdDate": "2019-04-08T07:35:12.433+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.433+0000",
      "name": "Users_Write",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 17,
      "createdDate": "2020-12-03T08:55:20.051+0000",
      "lastModifiedDate": "2020-12-03T08:55:20.051+0000",
      "name": "Karnataka Assessment Read",
      "stateId": 14,
      "assessmentToolModeId": null
    },
    {
      "id": 2,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "Facility_Metadata_Write",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 4,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "Facility_Write",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 6,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "Checklist_Write",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 8,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "Checklist_Metadata_Write",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 9,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "Assessment_Read",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 10,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "Assessment_Write",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 11,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "User",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 14,
      "createdDate": "2019-04-08T07:35:12.294+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.294+0000",
      "name": "Privilege_Write",
      "stateId": null,
      "assessmentToolModeId": null
    },
    {
      "id": 15,
      "createdDate": "2019-04-08T07:35:12.433+0000",
      "lastModifiedDate": "2019-04-08T07:35:12.433+0000",
      "name": "Users_Read",
      "stateId": null,
      "assessmentToolModeId": null
    }
  ]
};


it('should get state id from user', function () {
  let user = new User(userJson);
  let stateId = user.getStateId();
  expect(stateId).toEqual(14);
});
