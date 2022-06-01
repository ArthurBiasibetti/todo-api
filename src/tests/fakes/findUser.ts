import * as userService from '../../services/user.service';

const fakeFindUser = jest.spyOn(userService, 'findUser');

export default fakeFindUser;
