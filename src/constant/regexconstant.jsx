export const regex= {
    mobile: /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/g,
    email: /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    otp: /^\d{6}$/,
    zip: /^\d{5,6}$/,
    adhaar: /^\d{12}$/,
    hexcode: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    alpha: /^[aA-zZ]$/,
    gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    pincode: /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/,
    amount: /^\d+(\.\d{1,2})?$/,
    bloodgroup: /^(A|B|AB|O)[+-]$/,
    bankAccountNo: /^\d{9,18}$/,
    electionCard: /^([a-zA-Z]){3}([0-9]){7}?$/g,
    re16digit: /^\d{16}$/,
    ppfAccountNo: /^([A-Z]{2}\s)([A-Z]{3}\s)([0-9]{1,7}\s)([0-9]{3}\s)?([0-9]{1,7})$/gm,
    passport: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
 }

export const months=['January','February','March','April','May','June','July','August','September','October','November','December']