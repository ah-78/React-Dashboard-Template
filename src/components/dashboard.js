import React, { Component } from 'react'
import './dashboard.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import WidgetText from './widgetText';
import WidgetBar from './widgetBar';
import WidgetDoughnut from './widgetDoughnut';
import WidgetLine from './widgetLine';
import WidgetArea from './widgetArea';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import WidgetColumn from './widgetColumn';
//import WidgetPareto from './widgetPareto';
import WidgetPie from './widgetPie';
import WidgetMaxAvg from './widgetMaxAvg';
import WidgetMaxBounceRate from './widgetMaxBounceRate';
import WidgetTotalSession from './widgetTotalSession';

//excel import
const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class dashboard extends Component {
    constructor(){
        super();
        this.state ={
            item: [],
            dropdownOptions: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            pageViews:null,
            users:null,
            newUsers:null,
            sourceArr: [],
            usersArr: [],
            socialSource:null,
            emailSource:null,
            sessions:null,
            numberofsessionsperuser:null,
            pagepersession:null,
            avgsessiontime:null,
            bouncerate:null,
            pageviewArr: [],
            avgsessiontimeArr:[],
            bouncerateArr:[],
            maxavg:null,
            maxbr:null,
            Totalsession:null,
            sessionArr:[]
            
            
            

        }

    }
    getData= arg => {
        const arr = this.state.items;
        const arrlen = arr.length;
        let organicSource = 0;
        let directSource = 0;
        let selectedValue = null;
        let referralSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let sourceArr = [];
        let usersArr= [];
        let socialSource = 0;
        let emailSource = 0;
        let sessions = 0;
        let numberofsessionsperuser= 0;
        let pagepersession = 0;
        let avgsessiontime = 0;
        let bouncerate = 0;
        let pageviewArr= [];
        let avgsessiontimeArr= [];
        let maxavg=0;
        let bouncerateArr =[];
        let maxbr=null;
        let sessionArr=[];
        let Totalsession=0;
        
        for(let i=0;i<arrlen;i++){
            pageviewArr[i]=arr[i].page_views;
        }
        for(let i=0;i<arrlen;i++){
            avgsessiontimeArr[i]=arr[i].avg_session_time;
            if(avgsessiontimeArr[i]>=maxavg){
                maxavg=avgsessiontimeArr[i];
            }
            bouncerateArr[i]=arr[i].bounce_rate;
            if(bouncerateArr[i]>=maxbr){
                maxbr=avgsessiontimeArr[i];
            }
            sessionArr[i]=arr[i].page_per_session;
            
            Totalsession+=sessionArr[i];
            
        }
        
        for(let i=0;i<arrlen;i++){
            if(arg === arr[i]["month"]){
                organicSource=arr[i].organic_source;
                directSource=arr[i].direct_source;
                referralSource=arr[i].referral_source;
                pageViews=arr[i].page_views;
                users=arr[i].users;
                newUsers=arr[i].new_users;
                socialSource=arr[i].social_source;
                emailSource=arr[i].email_source;
                sessions=arr[i].sessions;
                numberofsessionsperuser=arr[i].number_of_sessions_per_users;
                pagepersession=arr[i].page_per_session;
                avgsessiontime=arr[i].avg_session_time;
                bouncerate=arr[i].bounce_rate;
                usersArr.push(
                      {
                        label: "Users",
                        value: arr[i].users
                      },
                      {
                        label: "New Users",
                        value: arr[i].new_users
                      },
                      
                     

                )
                sourceArr.push(
                    {
                      label: "Organic Source",
                      value: arr[i].organic_source
                    },
                    {
                      label: "Direct Source",
                      value: arr[i].direct_source
                    },
                    {
                      label: "Referral Source",
                      value: arr[i].referral_source
                    },
                    {
                        label: "Social Source",
                        value: arr[i].social_source
                    },
                    {
                        label: "Email Source",
                        value: arr[i].email_source
                    },
                   

                )

                
            }
        }
        selectedValue=arg;
        this.setState({
            organicSource:organicSource,
            directSource:directSource,
            referralSource:referralSource,
            pageViews:pageViews,
            users:users,
            newUsers:newUsers,
            sourceArr:sourceArr,
            usersArr:usersArr,
            socialSource:socialSource,
            emailSource:emailSource,
            sessions:sessions,
            numberofsessionsperuser:numberofsessionsperuser,
            pagepersession:pagepersession,
            avgsessiontime:avgsessiontime,
            bouncerate:bouncerate,
            pageviewArr:pageviewArr,
            avgsessiontimeArr:avgsessiontimeArr,
            maxavg:maxavg,
            maxbr:maxbr,
            Totalsession:Totalsession
            
            

        })


    }
    updateDashboard = event =>{
        this.getData(event.value);
        this.setState({selectedValue:event.value},()=>{
            console.log(this.state.users)
        });
         

    }
    componentDidMount(){
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
            console.log(rows);
            // dropdown options
            let dropdownOptions = [];

            for (let i = 0; i < rows.length; i++) {
                dropdownOptions.push(rows[i].month);
            }

            dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
            this.setState(
                {
                    items: rows,
                    dropdownOptions: dropdownOptions,
                    selectedValue: "Jan 2018"
                },
                () => this.getData("Jan 2018")
            );
        });

           

    }
    
    render() {
        // Preparing the chart data

  
    
    
    // Create a JSON object to store the chart configurations

        return (
            <div>
                <Container fluid>
                    <Row className="TopHeader">
                        <Col>
                        Dashboard 
                        </Col>
                        <Col>
                        <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="mainDashboard">
                        <Col>
                        <WidgetText title="Organic Source" value={this.state.organicSource} />
                        </Col>
                        <Col>
                        <WidgetText title="Direct Source" value={this.state.directSource} />
                        </Col>
                        <Col>
                        <WidgetText title="Referral Source" value={this.state.referralSource} />
                        </Col>
                        <Col>
                        <WidgetText title="Social Source" value={this.state.socialSource} />
                        </Col>
                        <Col>
                        <WidgetText title="Email Source" value={this.state.emailSource} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetBar title="Source Comparison Using Bar Chart" data={this.state.sourceArr}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetLine title="Source Comparison Using Line Chart" data={this.state.sourceArr} />
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetArea title="Source Comparison Using Area Chart" data={this.state.sourceArr} />
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetPie title="Source Comparison Using Pie Chart" data={this.state.sourceArr} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetDoughnut title="Users Comparison Using Doughnut Chart" data={this.state.usersArr}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetColumn title="Monthly Base PageView Comparison Using Column Chart" data={this.state.pageviewArr}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetTotalSession title="Total Number Of Session" value={this.state.Totalsession}/> 
                        </Col>
                    </Row> 
                    <Row>
                        <Col>
                        <WidgetMaxAvg title="Max Avg Session Time" value={this.state.maxavg} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WidgetMaxBounceRate title="Max Avg Session Time" value={this.state.maxbr} />
                        </Col>
                    </Row>
                   
                </Container>
                
            </div>
        )
    }
}

export default dashboard;