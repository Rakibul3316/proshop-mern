// Parent component => Home page
import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({product}) => {
  return (
      <>
        <Card className='mb-4'>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </a>

            <Card.Body>
             <a href={`/product/${product._id}`}>
                <Card.Title as='div' >
                    <strong>{ product.name}</strong>
                </Card.Title>
              </a>

            <Card.Text>
                <div className='my-3'>
                    <strong>{product.rating} from {product.numReviews} reviews</strong>
                </div>
            </Card.Text>  
            <Card.Text as='h3'>${ product.price}</Card.Text>
        </Card.Body>  
        </Card>
      </>
  )
}

export default Product