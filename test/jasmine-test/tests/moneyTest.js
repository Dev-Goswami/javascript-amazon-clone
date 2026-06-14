import { fixmoneyDesimal } from "../../../utils/money.js";



describe('ths test fixmoneyDisimal fuction',()=>{
    it('convert censts into Dollars',()=>{
        expect(fixmoneyDesimal(2095)).toEqual('20.95');
    });
    it('work with 0',()=>{
        expect(fixmoneyDesimal(0)).toEqual('0.00');
    });
    it('work wiht 2000.9',()=>{
        expect(fixmoneyDesimal(2000.9)).toEqual('20.01');
    });
});