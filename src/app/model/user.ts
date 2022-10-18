export class User {
	email: string;
	password: string;

	OTP!: string;

	firstname!: string;
	lastname!: string;
	address!: string;
	city!: string;
	province!: string;
	phoneNumber!: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}

	setOTP(OTP: string): void {
		this.OTP = OTP;
	}

	setPersonalData(firstname: string, lastname: string, address: string, city: string,	province: string, phoneNumber: string): void {
		this.firstname = firstname;
		this.lastname = lastname;
		this.address = address;
		this.city = city;
		this.province = province;
		this.phoneNumber = phoneNumber;
	}

}
