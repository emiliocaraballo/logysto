import request from 'supertest';
import app from '../app';

// describe('POST api/user',()=>{
//     it('Se creara un nuevo registro y responder con json.',done=>{
//         request(app)
//         .post('/api/user')
//         .send({
//             name:"Emilio Fernando",
//             lastname:"Caraballo dueñas",
//             email:"emiliocaraballo9810@gmail.com",
//             phone:"3017205180"
//         })
//         .set("Accept","application/json")
//         .expect('Content-Type','/json/')
//         .expect(201,done());
//     })
// }
// );