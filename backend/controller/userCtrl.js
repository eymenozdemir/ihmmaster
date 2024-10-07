const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Sale = require("../models/saleModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
//const crypto = require("crypto");
//const jwt = require("jsonwebtoken");
//const sendEmail = require("./emailCtrl");

//var OAuthClient = require('intuit-oauth');


// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  /**
   * TODO:With the help of email find the user exists or not
   */
  const newUser = await User.create(req.body);
  res.json(newUser);

});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      company: findUser?.company,
      vessel: findUser?.vessel,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Login a user
// const loginQuickbooks = asyncHandler(async (req, res) => {
//   console.log("girdiiiii");
//   // check if user exists or not

//   var oauthClient = new OAuthClient({
//     clientId: 'ABxJT6BbEMCmj0Ef70kXQQWJHs4F6XQYWekoLGNHJVZbXfsFwc',            // enter the apps `clientId`
//     clientSecret: '8dj7QK46IxzMhDoBr0DsrafEJROezhxjk7LeLHQZ',    // enter the apps `clientSecret`
//     environment: 'production',     // enter either `sandbox` or `production`
//     redirectUri: 'https://www.stonenaturesystem.com/admin/sales',      // enter the redirectUri
//     logging: true                               // by default the value is `false`
//   });
//   //console.log("userctrl bastır gs", oauthClient, "bastirma gs");
//   // AuthorizationUri
//   const authUri = oauthClient.authorizeUri({
//     scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
//     state: 'testState',
//   }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

//   // Redirect the authUri
//   //res.send(authUri);

//   oauthClient
//     .createToken(req.url)
//     .then(function (authResponse) {
//       oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
//     })
//     .catch(function (e) {
//       console.error(e);
//     });

//   //res.send('');

//   const companyID = oauthClient.getToken().realmId;

//   const url =
//     oauthClient.environment == 'sandbox'
//       ? OAuthClient.environment.sandbox
//       : OAuthClient.environment.production;

//   oauthClient
//     .makeApiCall({ url: `${url}v3/company/${companyID}/companyinfo/${companyID}` })
//     .then(function (authResponse) {
//       console.log(`The response for API call is :${JSON.stringify(authResponse)}`);
//       res.send(JSON.parse(authResponse.text()));
//     })
//     .catch(function (e) {
//       console.error(e);
//     });


//   console.log(res, "bastirma gs");
// });

let oauthClient = null;
let oauthClientTn = null;
let oauth2_token_json = null;
let oauth2_token_jsonTn = null;

const loginQuickbooks = asyncHandler(async (req, res) => {
  // check if user exists or not

  // oauthClient = new OAuthClient({
  //   clientId: 'ABxJT6BbEMCmj0Ef70kXQQWJHs4F6XQYWekoLGNHJVZbXfsFwc',            // enter the apps `clientId`
  //   clientSecret: '8dj7QK46IxzMhDoBr0DsrafEJROezhxjk7LeLHQZ',    // enter the apps `clientSecret`
  //   environment: 'production',     // enter either `sandbox` or `production`
  //   redirectUri: 'https://www.stonenaturesystem.com/admin/sales',      // enter the redirectUri
  //   logging: true                               // by default the value is `false`
  // });
  oauthClient = new OAuthClient({
    clientId: 'ABxJT6BbEMCmj0Ef70kXQQWJHs4F6XQYWekoLGNHJVZbXfsFwc',            // enter the apps `clientId`
    clientSecret: '8dj7QK46IxzMhDoBr0DsrafEJROezhxjk7LeLHQZ',    // enter the apps `clientSecret`
    environment: 'production',     // enter either `sandbox` or `production`
    redirectUri: 'https://api.stonenaturesystem.com/api/user/callback',      // enter the redirectUri
    logging: true                               // by default the value is `false`
  });
  //console.log("userctrl bastır gs", oauthClient, "bastirma gs");
  // AuthorizationUri
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'testState',
  }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

  // Redirect the authUri
  res.send(authUri);
});

const loginQuickbooksTn = asyncHandler(async (req, res) => {
  // check if user exists or not

  // oauthClient = new OAuthClient({
  //   clientId: 'ABxJT6BbEMCmj0Ef70kXQQWJHs4F6XQYWekoLGNHJVZbXfsFwc',            // enter the apps `clientId`
  //   clientSecret: '8dj7QK46IxzMhDoBr0DsrafEJROezhxjk7LeLHQZ',    // enter the apps `clientSecret`
  //   environment: 'production',     // enter either `sandbox` or `production`
  //   redirectUri: 'https://www.stonenaturesystem.com/admin/sales',      // enter the redirectUri
  //   logging: true                               // by default the value is `false`
  // });
  oauthClientTn = new OAuthClient({
    clientId: 'AB3LVnblTrA7f9q1mBi5lI1KcdMmK7Dfjp3KqM4CcM9camnTmE',            // enter the apps `clientId`
    clientSecret: 'r7vGMVTBh7iNtfreayPk7zEZxafrwisB5Mq0G8xI',    // enter the apps `clientSecret`
    environment: 'production',     // enter either `sandbox` or `production`
    redirectUri: 'https://api.stonenaturesystem.com/api/user/callback-tn',      // enter the redirectUri
    logging: true                               // by default the value is `false`
  });
  //console.log("userctrl bastır gs", oauthClient, "bastirma gs");
  // AuthorizationUri
  const authUri = oauthClientTn.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'testState',
  }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

  // Redirect the authUri
  res.send(authUri);
});


const quickbooksCallback = asyncHandler(async (req, res) => {

  oauthClient
    .createToken(req.url)
    .then(function (authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
    })
    .catch(function (e) {
      console.error(e);
    });

  res.send('');
});

const quickbooksCallbackTn = asyncHandler(async (req, res) => {

  oauthClientTn
    .createToken(req.url)
    .then(function (authResponse) {
      oauth2_token_jsonTn = JSON.stringify(authResponse.getJson(), null, 2);
    })
    .catch(function (e) {
      console.error(e);
    });

  res.send('');
});


const isLoggedIn = asyncHandler(async (req, res) => {
  if (oauth2_token_json != null) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403)
  }
});

const isLoggedInTn = asyncHandler(async (req, res) => {
  if (oauth2_token_jsonTn != null) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403)
  }
});

const getCompanyInfo = asyncHandler(async (req, res) => {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;
  oauthClient
    .makeApiCall({ url: `${OAuthClient.environment.production}v3/company/${companyID}/companyinfo/${companyID}` })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});

const getCompanyInfoTn = asyncHandler(async (req, res) => {
  const companyID = oauthClientTn.getToken().realmId;

  const url =
    oauthClientTn.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;
  oauthClientTn
    .makeApiCall({ url: `${OAuthClient.environment.production}v3/company/${companyID}/companyinfo/${companyID}` })
    .then(function (authResponse) {
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});


const getInvoice = asyncHandler(async (req, res) => {

  const allSales = await Sale.find({ branch: "Atlanta" }).sort({ date: -1 });
  let latestSaleDate = "2024-01-01T00:00:00-08:00";
  if (allSales.length > 0) {
    latestSaleDate = allSales[0].date;
  }

  const allInvoiceIds = allSales.map((sale) => sale.invoiceId);

  const products = await Product.find({});
  const productMap = {};
  const updatedProductMap = {};

  products.forEach((product) => {
    productMap[product.SKU] = product;
  });

  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;
  oauthClient
    .makeApiCall({ url: `${OAuthClient.environment.production}/v3/company/${companyID}/query?query=select * from invoice WHERE Metadata.CreateTime > '${latestSaleDate}'  ORDERBY Metadata.CreateTime` })
    .then(async (authResponse) => {

      /////////////////////////
      // oauthClient
      //   .makeApiCall({ url: `${OAuthClient.environment.production}/v3/company/${companyID}/query?query=select * from item` })
      //   .then(async (itemResponse) => {

      //     console.log(`The response for API call is (itemresponse) :${JSON.stringify(itemResponse)}`);

      //   })
      /////////////////////////
      const docs = [];
      // console.log(`The response for API call is (getinvoice) :${JSON.stringify(authResponse)}`);

      authResponse.json.QueryResponse?.Invoice?.forEach((invoice) => {
        if (!allInvoiceIds.includes(invoice?.Id)) {
          // let values = {};
          let items = [];
          let temp_price = 0;
          let temp_job = "-";
          let temp_rep = "-";
          invoice.Line.forEach((item) => {
            if (item?.Id != undefined) {
              items.push({
                //title: item.Description,
                title: item?.Description || "-",
                items: item?.SalesItemLineDetail?.ItemRef?.name || "-",
                quantity: item?.SalesItemLineDetail?.Qty || 0,
                price: item?.SalesItemLineDetail?.UnitPrice || 0,
                SKU: item?.SalesItemLineDetail?.SKU || "-"
              });
            }
            else {
              temp_price = temp_price + item?.Amount;
            }
          });



          items.forEach((item) => {
            if (item.SKU != "-") {
              if (updatedProductMap[item.SKU] == null) {
                updatedProductMap[item.SKU] = productMap[item.SKU];
              }
              updatedProductMap[item.SKU].stockAtlanta -= item.quantity;
            }
          });

          invoice.CustomField.forEach((item) => {
            if (item?.Name == "REP") {
              temp_rep = item?.StringValue || "-";
            }
            else {
              temp_job = item?.StringValue || "-";
            }
          });

          docs.push({
            invoiceId: invoice?.Id || "-",
            soldItems: items,
            date: invoice?.MetaData?.CreateTime || "1950-01-01T00:00:00-08:00",
            subtotalPrice: temp_price,
            taxPrice: invoice?.TxnTaxDetail?.TotalTax || 0,
            totalPrice: invoice?.TotalAmt || 0,
            billTo: ((invoice?.BillAddr?.Line1 || "") + " " + (invoice?.BillAddr?.Line2 || "") + " " + (invoice?.BillAddr?.Line3 || "") + " " + (invoice?.BillAddr?.Line4 || "") + " " + (invoice?.BillAddr?.City || "") + " " + (invoice?.BillAddr?.CountrySubDivisionCode || "") + " " + (invoice?.BillAddr?.Country || "") + " " + (invoice?.BillAddr?.PostalCode || "")).replace(/\s+/g, ' '),
            shipTo: ((invoice?.ShipAddr?.Line1 || "") + " " + (invoice?.ShipAddr?.Line2 || "") + " " + (invoice?.ShipAddr?.Line3 || "") + " " + (invoice?.ShipAddr?.Line4 || "") + " " + (invoice?.ShipAddr?.City || "") + " " + (invoice?.ShipAddr?.CountrySubDivisionCode || "") + " " + (invoice?.ShipAddr?.Country || "") + " " + (invoice?.ShipAddr?.PostalCode || "")).replace(/\s+/g, ' '),
            shipvia: invoice?.ShipMethodRef?.name || "-",
            rep: temp_rep,
            job: temp_job,
            branch: "Atlanta",
          });

          // const response2 = await axios.post(`${base_url}user/set-invoice`, values);
        }
      });
      const options = { ordered: true };
      // Execute insert operation
      if (docs.length > 0) {
        const result = await Sale.insertMany(docs, options);

        // //updating products
        // var bulk = Product.initializeUnorderedBulkOp();
        // Object.keys(updatedProductMap).forEach((SKU) => {
        //   bulk.find({ _id: updatedProductMap[SKU]._id }).upsert().update({ $set: updatedProductMap[SKU] });
        // });
        // bulk.execute();

        const updateStatements = Object.keys(updatedProductMap).map((SKU) => {
          return {
            updateOne: {
              filter: { SKU: SKU },
              update: { $set: { stockAtlanta: updatedProductMap[SKU].stockAtlanta } }
            }
          };
        });

        const updateProductResult = await Product.bulkWrite(updateStatements);

      }
      res.send("done");
    })
    .catch(function (e) {
      console.error(e);
    });
});


const getInvoiceTn = asyncHandler(async (req, res) => {

  const allSales = await Sale.find({ branch: "Nashville" }).sort({ date: -1 });
  let latestSaleDate = "2024-01-01T00:00:00-08:00";
  if (allSales.length > 0) {
    latestSaleDate = allSales[0].date;
  }

  const allInvoiceIds = allSales.map((sale) => sale.invoiceId);

  const products = await Product.find({});
  const productMap = {};
  const updatedProductMap = {};

  products.forEach((product) => {
    productMap[product.SKU] = product;
  });

  const companyID = oauthClientTn.getToken().realmId;

  const url =
    oauthClientTn.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;
  oauthClientTn
    .makeApiCall({ url: `${OAuthClient.environment.production}/v3/company/${companyID}/query?query=select * from invoice WHERE Metadata.CreateTime > '${latestSaleDate}'  ORDERBY Metadata.CreateTime` })
    .then(async (authResponse) => {

      const docs = [];

      authResponse.json.QueryResponse?.Invoice?.forEach((invoice) => {
        if (!allInvoiceIds.includes(invoice?.Id)) {
          // let values = {};
          let items = [];
          let temp_price = 0;
          let temp_job = "-";
          let temp_rep = "-";
          invoice.Line.forEach((item) => {
            if (item?.Id != undefined) {
              items.push({
                //title: item.Description,
                title: item?.Description || "-",
                items: item?.SalesItemLineDetail?.ItemRef?.name || "-",
                quantity: item?.SalesItemLineDetail?.Qty || 0,
                price: item?.SalesItemLineDetail?.UnitPrice || 0,
                SKU: item?.SalesItemLineDetail?.SKU || "-"
              });
            }
            else {
              temp_price = temp_price + item?.Amount;
            }
          });



          items.forEach((item) => {
            if (item.SKU != "-") {
              if (updatedProductMap[item.SKU] == null) {
                updatedProductMap[item.SKU] = productMap[item.SKU];
              }
              updatedProductMap[item.SKU].stockNashville -= item.quantity;
            }
          });

          invoice.CustomField.forEach((item) => {
            if (item?.Name == "Sales Rep") {
              temp_rep = item?.StringValue || "-";
            }
            else {
              temp_job = item?.StringValue || "-";
            }
          });

          docs.push({
            invoiceId: invoice?.Id || "-",
            soldItems: items,
            date: invoice?.MetaData?.CreateTime || "1950-01-01T00:00:00-08:00",
            subtotalPrice: temp_price,
            taxPrice: invoice?.TxnTaxDetail?.TotalTax || 0,
            totalPrice: invoice?.TotalAmt || 0,
            billTo: ((invoice?.BillAddr?.Line1 || "") + " " + (invoice?.BillAddr?.Line2 || "") + " " + (invoice?.BillAddr?.Line3 || "") + " " + (invoice?.BillAddr?.Line4 || "") + " " + (invoice?.BillAddr?.City || "") + " " + (invoice?.BillAddr?.CountrySubDivisionCode || "") + " " + (invoice?.BillAddr?.Country || "") + " " + (invoice?.BillAddr?.PostalCode || "")).replace(/\s+/g, ' '),
            shipTo: ((invoice?.ShipAddr?.Line1 || "") + " " + (invoice?.ShipAddr?.Line2 || "") + " " + (invoice?.ShipAddr?.Line3 || "") + " " + (invoice?.ShipAddr?.Line4 || "") + " " + (invoice?.ShipAddr?.City || "") + " " + (invoice?.ShipAddr?.CountrySubDivisionCode || "") + " " + (invoice?.ShipAddr?.Country || "") + " " + (invoice?.ShipAddr?.PostalCode || "")).replace(/\s+/g, ' '),
            shipvia: invoice?.ShipMethodRef?.name || "-",
            rep: temp_rep,
            job: temp_job,
            branch: "Nashville",
          });

          // const response2 = await axios.post(`${base_url}user/set-invoice`, values);
        }
      });
      const options = { ordered: true };
      // Execute insert operation
      if (docs.length > 0) {
        const result = await Sale.insertMany(docs, options);

        // //updating products
        // var bulk = Product.initializeUnorderedBulkOp();
        // Object.keys(updatedProductMap).forEach((SKU) => {
        //   bulk.find({ _id: updatedProductMap[SKU]._id }).upsert().update({ $set: updatedProductMap[SKU] });
        // });
        // bulk.execute();

        const updateStatements = Object.keys(updatedProductMap).map((SKU) => {
          return {
            updateOne: {
              filter: { SKU: SKU },
              update: { $set: { stockNashville: updatedProductMap[SKU].stockNashville } }
            }
          };
        });

        const updateProductResult = await Product.bulkWrite(updateStatements);

      }
      res.send("done");
    })
    .catch(function (e) {
      console.error(e);
    });
});


const setInvoice = asyncHandler(async (req, res) => {
  //const companyID = oauthClient.getToken().realmId;

  // console.log("hellooo from setinvoice: ", req);

  try {
    const newProduct = await Sale.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});
// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser.role !== "Admin" && findUser.role !== "CompanyPersonal" && findUser.role !== "VesselStaff") throw new Error("Not Authorised");
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      company: findUser?.company,
      vessel: findUser?.vessel,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  //console.log("burlarda dolanman guxxum");
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updateUser = asyncHandler(async (req, res) => {
  console.log("dsdfssdfdsfffffffffff", req.params, req.body);
  const _id = req.params.id;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        role: req?.body?.role,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        company: req?.body?.company,
        vessel: req?.body?.vessel,
        address: req?.body?.address,
        city: req?.body?.city,
        state: req?.body?.state,
        country: req?.body?.country,
        zip: req?.body?.zip,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("company").populate("vessel");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users by company

const getUsersByCompany = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  //console.log(req, id);
  try {
    const getUsers = await User.find({ company: id }).populate("company").populate("vessel");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users by vessel

const getUsersByVessel = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const getUsers = await User.find({ vessel: id }).populate("company").populate("vessel");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {

  const { id } = req?.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);

    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getASale = asyncHandler(async (req, res) => {

  const { id } = req?.params;
  validateMongoDbId(id);

  try {
    const getASale = await Sale.findById(id);

    res.json({
      getASale,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrder = asyncHandler(async (req, res) => {

  const { id } = req?.params;
  validateMongoDbId(id);

  try {
    const getAnOrder = await Order.findById(id);

    res.json({
      getAnOrder,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSale = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //console.log("getaproddfssd çalıştı");
  validateMongoDbId(id);
  try {
    const deletedSale = await Sale.findOneAndDelete({ _id: id });
    res.json(deletedSale);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const _id = req.headers.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3001/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  //console.log("girdi 3");
  const _id = req.headers.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");//populate içideki wishlisti değiştirmek gerekebili 8.30.00
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, quantity, currency, price, setup, service, config } = req.body;
  const _id = req.headers.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      currency,
      price,
      quantity,
      setup,
      service,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//GETVESSELBYID !!!!!!
const getUserCart = asyncHandler(async (req, res) => {
  const _id = req.headers.user;
  //console.log("servedan baktım", _id);
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id }).populate(
      "productId"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const _id = req.headers.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);
  try {
    const deleteProductFromCart = await Cart.deleteOne({ userId: _id, _id: cartItemId });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const _id = req.headers.user;
  validateMongoDbId(_id);
  try {
    const deleteCart = await Cart.deleteMany({ userId: _id });
    res.json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const _id = req.headers.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

/*
const emptyCart = asyncHandler(async (req, res) => {
  const  _id  = req.headers.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
*/

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const _id = req.headers.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const totalPrice = req.body.totalPrice;
  const containerCode = req.body.data.code;
  const description = req.body.data.description;
  const location = req.body.data.location;
  const destination = req.body.data.destination;
  const items = req.body.prods;
  const _id = req.headers.user;




  try {
    const products = await Product.find({});
    const productMap = {};
    const updatedProductMap = {};

    products.forEach((product) => {
      productMap[product.SKU] = product;
    });


    items.forEach((item) => {
      if (item.SKU != null && item.SKU != "-") {
        if (updatedProductMap[item.SKU] == null) {
          updatedProductMap[item.SKU] = productMap[item.SKU];
        }

        if (destination == "Atlanta") {
          updatedProductMap[item.SKU].toAtlanta += item.quantity;
        }
        else if (destination == "Nashville") {
          updatedProductMap[item.SKU].toNashville += item.quantity;
        }
        else if (destination == "Savannah") {
          updatedProductMap[item.SKU].toSavannah += item.quantity;
        }
      }
    });

    const updateStatements = Object.keys(updatedProductMap).map((SKU) => {
      return {
        updateOne: {
          filter: { SKU: SKU },
          update: { $set: { toAtlanta: updatedProductMap[SKU].toAtlanta, toNashville: updatedProductMap[SKU].toNashville, toSavannah: updatedProductMap[SKU].toSavannah } }
        }
      };
    });
    const updateProductResult = await Product.bulkWrite(updateStatements);
    const order = await Order.create({ containerCode, description, location, destination, totalPrice, user: _id, orderedItems: items });
    res.json({
      order,
      success: true
    });
  } catch (error) {

    throw new Error(error);
  }

});

const getMyOrders = asyncHandler(async (req, res) => {
  const _id = req.headers.user._id;
  try {
    const orders = await Order.find({ user: _id }).populate("user");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

/*
const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const  _id  = req.headers.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});
*/
//Dogrusu bu !!!
const getOrders = asyncHandler(async (req, res) => {
  const _id = req.headers.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    //console.log("useerctrllllll girdi", req);
    const alluserorders = await Order.find()

      .populate("user");
    res.json(alluserorders);
  } catch (error) {
    //console.log("useerctrllllll girdi", error);
    throw new Error(error);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //console.log("deleteorderahjsdj çalıştı");
  validateMongoDbId(id);
  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: id });
    res.json(deletedOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {


    if (req.body.orderStatus == "Products at Warehouse") {
      const products = await Product.find({});
      const productMap = {};
      const updatedProductMap = {};

      products.forEach((product) => {
        productMap[product.SKU] = product;
      });

      const orderedItems = req.body.orderedItems;

      orderedItems.forEach((item) => {
        if (item.SKU != null && item.SKU != "-") {
          if (updatedProductMap[item.SKU] == null) {
            updatedProductMap[item.SKU] = productMap[item.SKU];
          }

          if (req.body.destination == "Atlanta") {
            updatedProductMap[item.SKU].stockAtlanta += item.quantity;
            updatedProductMap[item.SKU].toAtlanta -= item.quantity;
          }
          else if (req.body.destination == "Nashville") {
            updatedProductMap[item.SKU].stockNashville += item.quantity;
            updatedProductMap[item.SKU].toNashville -= item.quantity;
          }
          else if (req.body.destination == "Savannah") {
            updatedProductMap[item.SKU].stockSavannah += item.quantity;
            updatedProductMap[item.SKU].toSavannah -= item.quantity;
          }
        }
      });

      const updateStatements = Object.keys(updatedProductMap).map((SKU) => {
        return {
          updateOne: {
            filter: { SKU: SKU },
            update: {
              $set: {
                stockAtlanta: updatedProductMap[SKU].stockAtlanta, toAtlanta: updatedProductMap[SKU].toAtlanta,
                stockNashville: updatedProductMap[SKU].stockNashville, toNashville: updatedProductMap[SKU].toNashville,
                stockSavannah: updatedProductMap[SKU].stockSavannah, toSavannah: updatedProductMap[SKU].toSavannah
              }
            }
          }
        };
      });
      const updateProductResult = await Product.bulkWrite(updateStatements);
    }
    else if (req.body.orderStatus == "Canceled") {
      const products = await Product.find({});
      const productMap = {};
      const updatedProductMap = {};

      products.forEach((product) => {
        productMap[product.SKU] = product;
      });

      const orderedItems = req.body.orderedItems;

      orderedItems.forEach((item) => {
        if (item.SKU != null && item.SKU != "-") {
          if (updatedProductMap[item.SKU] == null) {
            updatedProductMap[item.SKU] = productMap[item.SKU];
          }

          if (req.body.destination == "Atlanta") {
            updatedProductMap[item.SKU].toAtlanta -= item.quantity;
          }
          else if (req.body.destination == "Nashville") {
            updatedProductMap[item.SKU].toNashville -= item.quantity;
          }
          else if (req.body.destination == "Savannah") {
            updatedProductMap[item.SKU].toSavannah -= item.quantity;
          }
        }
      });

      const updateStatements = Object.keys(updatedProductMap).map((SKU) => {
        return {
          updateOne: {
            filter: { SKU: SKU },
            update: { $set: { toAtlanta: updatedProductMap[SKU].toAtlanta, toNashville: updatedProductMap[SKU].toNashville, toSavannah: updatedProductMap[SKU].toSavannah } }
          }
        };
      });
      const updateProductResult = await Product.bulkWrite(updateStatements);
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedOrder);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  loginQuickbooks,
  quickbooksCallback,
  getCompanyInfo,
  loginQuickbooksTn,
  quickbooksCallbackTn,
  getCompanyInfoTn,
  isLoggedIn,
  isLoggedInTn,
  getallUser,
  getUsersByCompany,
  getUsersByVessel,
  getaUser,
  getInvoice,
  getInvoiceTn,
  setInvoice,
  deleteaUser,
  updateUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  userCart,
  getUserCart,
  getASale,
  deleteSale,
  getOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getMyOrders,
  getOrders,
  deleteOrder,
  updateOrderStatus,
  updateOrder,
  getAllOrders,
  getOrderByUserId,
};