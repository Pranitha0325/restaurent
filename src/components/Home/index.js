import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Category from '../Category'
import './index.css'

class Home extends Component {
  state = {count: 0, restaurentDetails: [], category: [], dishes: []}
  componentDidMount() {
    this.getData()
  }

  successView = data => {
    const listItems = data.table_menu_list
    this.setState({
      restaurentDetails: data,
      category: listItems,
      dishes: listItems[0].category_dishes,
    })
  }

  getData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()
    if (response.ok) {
      this.successView(data[0])
    } else {
      this.failureView()
    }
  }

  onSelectCategory = id => {
    const {category} = this.state
    for (let i in category) {
      const selectedId = category[i].menu_category_id
      if (selectedId === id) {
        this.setState({dishes: category[i].category_dishes})
      }
    }
  }

  onDecrease = () => {
    this.setState((prevState)=>({count:prevState.count-1}))
  }

  onIncrease = () => {
    this.setState((prevState)=>({
      count:prevState.count+1
    }))
  }

  render() {
    const {restaurentDetails, category, dishes, count} = this.state
    console.log(restaurentDetails)
    console.log(dishes)

    return (
      <div>
        <div className="header">
          <h1>{restaurentDetails.restaurant_name}</h1>
          <p>My Orders</p>
          <AiOutlineShoppingCart className="cart_logo" />
          <p>{count}</p>
        </div>
        <div className="list">
          <ul className="categories_list">
            {category.map(each => (
              <li key={each.menu_category_id}>
                <button
                  type="button"
                  onClick={() => this.onSelectCategory(each.menu_category_id)}
                >
                  {each.menu_category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {dishes.map(each => (
              <li key={each.dish_id}>
                <div className="dishes">
                  <div>
                  {each.addonCat.length!==0 && <p>Customization Available</p> }
                    <p>{each.dish_name}</p>
                    <p>{each.dish_currency} {each.dish_price}</p>
                    <p>{each.dish_description}</p>
                    <p>{each.dish_calories} calories</p>
                    {each.dish_Availability ? (
                      <div className="add-item">
                        <button onClick={this.onDecrease}>-</button>
                        <p>{count}</p>
                        <button onClick={this.onIncrease}>+</button>
                      </div>
                    ) : (
                      <p>Not Available</p>
                    )}
                    {each.addonCat.length!==0 && <p>Customizations available</p> }
                  </div>
                  <img
                    className="dish-image"
                    src={each.dish_image}
                    alt={each.dish_id}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Home
