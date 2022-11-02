//Importamos librerias
import React from 'react';
//Importamos archivos de proyecto
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import {Switch, Route, Redirect} from  'react-router-dom';
//Importamos archivos de terceros


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }
  }

  onDishSelect(dishId){
    this.setState({selectedDish: dishId});
  }

  render(){
    const HomePage =()=>{
      return(
        <Home
          dish= {this.state.dishes.filter((dish)=>dish.featured)[0]}
          promotion = {this.state.promotions.filter((promotion)=>promotion.featured)[0]}
          leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    }

    const ContactPage =()=>{
      return(
        <Contact/>
      );
    }

    const AboutPage =()=>{
      return(
        <About leaders={this.state.leaders}/>
      );
    }



    const DishWithId =({match})=>{
      return(
        <DishDetail
          dish={this.state.dishes.filter((dish)=> dish.id===parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
          >
        </DishDetail>
      );
    }


    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu"
          component={()=>
            <div>
              <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
              <DishDetail className="text-center" dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}></DishDetail>
            </div>
          }/>
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route exact path="/contactus" component={ContactPage}/>
        <Route exact path="/aboutus" component={AboutPage}/>
        <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
