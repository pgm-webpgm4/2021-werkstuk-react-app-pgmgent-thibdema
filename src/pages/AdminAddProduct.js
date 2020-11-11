import React, { useEffect, useState } from 'react';
import {gql, useMutation} from '@apollo/client';

import {ContentLoader, ErrorAlert, SelectedItem} from '../components';

const ADD_PRODUCT = gql`
  mutation addProduct($title: String!, $description: String!, $price: Float, $images: [ImageInput], $created_At: Date, $color: [String]!, $sizes: [SizeQuantityInputs]!, $audience: Audience, $type: Producttype) {
  addProduct(
    product: {
      title: $title
      description: $description
      price: $price
      images: $images
      created_At: $created_At
      color: $color
      sizes: $sizes
      audience: $audience
      type: $type
    }
  )
  {id, title, price}
}
`;

const AdminAddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [XS, setXS] = useState(0);
  const [S, setS] = useState(0);
  const [M, setM] = useState(0);
  const [L, setL] = useState(0);
  const [XL, setXL] = useState(0);
  const [XXL, setXXL] = useState(0);
  const [audience, setAudience] = useState();
  const [type, setType] = useState('');
  const [IMGURL, setIMGURL] = useState('');
  const [IMGALT, setIMGALT] = useState('');

  const [addProduct, { loading, errors, data }] = useMutation(ADD_PRODUCT);

  const DeleteImage = (position) => {
    setImages(images.filter((e, key) => key !== position));
  };

  const AddImage = async () => {
    if(!!IMGURL && !!IMGALT) {
      await setImages([...images, {url: IMGURL, alt: IMGALT}]);
      await setIMGURL('');
      await setIMGALT('');
    }
  };

  const AddColor = (color) => {
    if(!!color) {
      if(!colors.includes(color)) {
        setColors([...colors, color]);
      } else {
        console.log(`Color ${color} is already added to the colors.`);
      }
    } else console.log("No color was given.");
    setCurrentColor('#ffffff');
  };

  const RemoveColor = (color) => {
    setColors(colors.filter((c) => c !== color ));
  };

  useEffect(() => {
    if(loading) return(<ContentLoader />);
    if(!!errors) console.log(errors);
    if(data) console.log(data);
  });

  return(
    <div className="adminaddproduct container d-flex justify-content-center">
      {!!data && <SuccessAlert message="Product added succesfully." />}
      {!!errors && <ErrorAlert message="Something went wrong." />}
      <form className="col-md-8 col-12" onSubmit={(e) => {
        e.preventDefault();
        addProduct({
          variables: {
            title: title,
            description: description,
            price: parseFloat(price),
            images: images,
            created_At: new Date(),
            color: colors,
            sizes: [{
                size: "XS",
                quantity: Number(XS)
              }, {
                size: "S",
                quantity: Number(S)
              }, {
                size: "M",
                quantity: Number(M)
              }, {
                size: "L",
                quantity: Number(L)
              }, {
                size: "XL",
                quantity: Number(XL)
              }, {
                size: "XXL",
                quantity: Number(XXL)
              }
            ],
            audience: audience,
            type: type,
          }
        });
      }}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title" id="title" type="text" minLength="5" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" id="description" type="text" minLength="20" required></textarea>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4 col-12">
            <label htmlFor="price">Price</label>
            <input className="form-control" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Price" id="price" type="number" min="0.00" minLength="1" step="0.01" required />
          </div>
          <div className="form-group col-md-4 col-12">
            <label htmlFor="addcolor">Add color</label>
            <div className="d-flex align-items-center">
              <input onChange={(e) => setCurrentColor(e.target.value)} name="color" type="color" id="addcolor" value={currentColor} />
              <button style={{marginLeft: '1rem'}} onClick={() => AddColor(currentColor)} className="btn btn-primary" type="button">Add color</button>
            </div>
          </div>
          <div className="form-group col-md-4 col-12">
            <label htmlFor="colors">Colors</label>
            <div className="d-flex flex-wrap" >
              {(colors.length > 0) ?
                colors.map((e,key) => <div key={key} onClick={() => RemoveColor(e)} className="color" style={{backgroundColor: e}}><span>&#9587;</span></div>)
                : "No colors yet"
              }

            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2 col-12">
            <label htmlFor="XS">Extra small</label>
            <input className="form-control" onChange={(e) => setXS(e.target.value)} value={XS} placeholder="Extra small" id="XS" type="number" minLength="1" min="0" required />
          </div>
          <div className="form-group col-md-2 col-12">
            <label htmlFor="S">Small</label>
            <input className="form-control" onChange={(e) => setS(e.target.value)} value={S} placeholder="Small" id="S" type="number" minLength="1" min="0" required />
          </div>
          <div className="form-group col-md-2 col-12">
            <label htmlFor="M">Medium</label>
            <input className="form-control" onChange={(e) => setM(e.target.value)} value={M} placeholder="Medium" id="M" type="number" minLength="1" min="0" required />
          </div>
          <div className="form-group col-md-2 col-12">
            <label htmlFor="L">Large</label>
            <input className="form-control" onChange={(e) => setL(e.target.value)} value={L} placeholder="Large" id="L" type="number" minLength="1" min="0" required />
          </div>
          <div className="form-group col-md-2 col-12">
            <label htmlFor="XL">Extra large</label>
            <input className="form-control" onChange={(e) => setXL(e.target.value)} value={XL} placeholder="Extra large" id="XL" type="number" minLength="1" min="0" required />
          </div>
          <div className="form-group col-md-2 col-12">
            <label htmlFor="XXL">Extra extra large</label>
            <input className="form-control" onChange={(e) => setXXL(e.target.value)} value={XXL} placeholder="Extra extra large" id="XXL" type="number" minLength="1" min="0" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4 col-12">
            <label htmlFor="Audience">Audience</label>
            <select onChange={(e) => setAudience(e.target.value)} className="custom-select" id="Audience" required>
              <option defaultValue disabled>Choose...</option>
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>
          <div className="form-group col-md-4 col-12">
            <label htmlFor="Type">Product type</label>
            <select onChange={(e) => setType(e.target.value)} className="custom-select" id="Type" required>
              <option defaultValue disabled>Choose...</option>
              <option>Tshirts</option>
              <option>Shirts</option>
              <option>Sweaters</option>
              <option>Pants</option>
              <option>Underpants</option>
              <option>Socks</option>
              <option>Hats</option>
              <option>Bags</option>
              <option>Shoes</option>
            </select>
          </div>
        </div>
        <div className="form-row align-items-end">
          <div className="form-group col-md-6 col-12">
              <label htmlFor="imageurl">Image url</label>
              <input type="url" className="form-control" onChange={(e) => setIMGURL(e.target.value)} value={IMGURL} placeholder="Image url" id="imageurl" />
          </div>
          <div className="form-group col-md-4 col-12">
              <label htmlFor="imagealt">Image alt</label>
              <input type="text" className="form-control" onChange={(e) => setIMGALT(e.target.value)} value={IMGALT} placeholder="Image alt" id="imagealt" />
          </div>
          <div>
            <button style={{marginLeft: '1rem', marginBottom: '1rem'}} onClick={() => AddImage()} className="btn btn-primary" type="button">Add image</button>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center">
          {(images.length > 0) ? 
            images.map((e, key) => <SelectedItem text={e.alt} key={key} deleteIMG={() => DeleteImage(key)} />)
            : ''
          }
        </div>

        <button className="btn btn-primary" type="submit">Add product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;