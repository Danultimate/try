import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  FlatList,
  ImageBackground
} from "react-native";
import {
  View,
  Container,
  Header,
  Item,
  Input,
  Content,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  List,
  ListItem,
  SearchBar,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import ErrorMessages from "../../constants/errors";
import Error from "./Error";
import Spacer from "./Spacer";
import Loading from "./Loading";
import FilterBar from "./FilterBar";
import Products from "./Products";
import ProductList from "./ProductsList";

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
moment.locale("es");

import { decode as atob } from "base-64";
// import shopifyAPI from "../../constants/shopify_axios";
import shopify from "../../constants/shopify";
import { Mixpanel } from "../../actions/mixpanel";

const keyExtractor = item => item.id.toString();

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingResults: false,
      runQuery: false,
      query: "",
      keyword: "",
      filter: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loadingResults: true });
    console.log('update props @search ')
    console.log(nextProps.keyword);
    let runQuery = false;
    let query = "";

    let keyword = nextProps.keyword;
    if (typeof keyword != "undefined" && keyword != "" && keyword != " ") {
      this.setState({
        keyword: nextProps.keyword,
        query: nextProps.keyword,
        runQuery: true
      });
      runQuery = true;
      query = nextProps.keyword;

    } else {
      this.setState({ loadingResults: false });
    }

    if (typeof nextProps.filter != "undefined" && nextProps.filter != "") {
      console.log('entra al filter')
      this.setState({
        filter: nextProps.filter,
        query: `${this.state.keyword} tag:["${nextProps.filter}"]`,
        runQuery: true
      });
      runQuery = true;
      query = `${this.state.keyword} tag:["${nextProps.filter}"]`;
    } 
    // TODO: quitar estas dos lineas
    // runQuery = true;
    // query = "cyzone";
    console.log(runQuery)
    if (runQuery) {
      console.log('el query')
      console.log(query)
      const collectionQuery = {
        first: 10,
        //query:"variants.price:<=30000"
        query: query
      };

      shopify.product.fetchQuery(collectionQuery).then(res => {
        console.log("resultado");
        this.setState({ products: res, loadingResults: false });
      });
    }
  }

  render() {
    Mixpanel.screen("Search");

    if (this.state.loadingResults) return <Loading />;

    return (
      <Container style={styles.container}>
        {Platform.OS === "iOS" && <StatusBar barStyle="dark-content" />}
        <Content padder>
          <FilterBar />
          
          <ProductList products={this.state.products} />
        </Content>
      </Container>
    );
  }
}

Search.propTypes = {
  error: PropTypes.string
};

Search.defaultProps = {
  error: null
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  userBar: {
    flexDirection: "row",
    backgroundColor: Colors.brandPrimary,
    height: 104,
    padding: 12,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10
  },
  userGreeting: {
    fontFamily: "playfair",
    color: "white",
    fontSize: 24,
    lineHeight: 24
  },
  userMessage: {
    color: "#B09DE0",
    fontSize: 14
  },
  userNumberLabel: {
    color: "#B09DE0",
    fontSize: 10,
    marginTop: 16
  },
  userSales: {
    fontSize: 26,
    color: "white"
  },
  userCurrency: {
    fontSize: 16,
    color: "white"
  },
  userClients: {
    fontSize: 18,
    color: "white",
    marginTop: 8
  },
  userImg: {
    flex: 0.2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  userAvatar: {
    marginBottom: 12
  },
  userCode: {
    fontSize: 10,
    textAlign: "center",
    color: "#B09DE0"
  },
  userInfo: { flex: 0.8 },
  userNumbers: {
    flexDirection: "row",
    height: 32
  },
  card: {
    shadowColor: "#E2E1E6",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2
  },
  header: {
    fontFamily: "playfair",
    fontSize: 32,
    marginBottom: 8,
    lineHeight: 28
  },
  meta: {
    fontSize: 10,
    color: "#C3C5C7"
  },
  description: {
    fontSize: 18
  },
  category: {
    fontWeight: "bold",
    marginBottom: 8
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  cardSuccess: {
    borderTopColor: Colors.brandSuccess,
    borderTopWidth: 2
  },
  cardButtonText: {
    paddingLeft: 8,
    paddingRight: 8
  },
  cardFooter: {
    borderBottomWidth: 0,
    borderTopColor: "#EBEDF0",
    paddingHorizontal: 0
  },
  successMsg: {
    color: Colors.brandSuccess
  },
  warningMsg: {
    color: Colors.brandWarning
  },
  primaryMsg: {
    color: Colors.brandPrimary
  },
  textCenter: {
    textAlign: "center"
  },
  supportWidget: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40
  },
  supportHeader: {
    fontSize: 24
  },
  supportText: {
    fontSize: 14
  },
  horizontalScroll: {},
  transparentCard: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: 128
  },
  notifications: {
    backgroundColor: "#EDEBF5",
    padding: 12,
    paddingRight: 0,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10
  },
  notification: {
    width: 224,
    height: 88,
    borderRadius: 0,
    shadowColor: "#E2E1E6"
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  leftContainer: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  rightContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  notificationDate: {
    alignSelf: "flex-end"
  },
  notificationTitle: {
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 0
  },
  notificationText: {
    fontSize: 12,
    lineHeight: 18
  },
  notificationBody: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  referralCode: {
    fontWeight: "bold",
    fontSize: 20
  },
  productTitle: {
    fontSize: 16,
    lineHeight: 16
  },
  loadMore: {
    backgroundColor: "#F1EDFA",
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 2,
    shadowColor: "transparent"
  },
  loadMoreText: {
    fontSize: 14,
    color: Colors.brandInfo
  }
});
