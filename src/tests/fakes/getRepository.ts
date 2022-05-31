import * as typeorm from 'typeorm';

const fakeGetRepository = jest.spyOn(typeorm, 'getRepository');

export default fakeGetRepository;
