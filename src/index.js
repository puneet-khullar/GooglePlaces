import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ReactDOM from "react-dom";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover
// } from "@reach/combobox";
import "@reach/combobox/styles.css";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng
// } from "use-places-autocomplete";
import "./styles.css";
// import useOnclickOutside from "react-cool-onclickoutside";
import Search from "./search";
// const libraries = ["places"];

let renderCount = 0;

function App() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ firstName: "Bill", lastName: "Luo", test: "a" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });
  // const {
  //   ready,
  //   value,
  //   suggestions: { status, data },
  //   setValue,
  //   clearSuggestions
  // } = usePlacesAutocomplete({
  //   requestOptions: {
  //     location: { lat: () => 25.276987, lng: () => 55.296249 },
  //     radius: 100 * 1000
  //   }
  // });
  // const panTo = (lat, lng, index) => {
  //   console.log(lat, lng, index);
  // };
  // const handleInput = (e) => {
  //   setValue(e.target.value);
  // };

  // const handleSelect = async (address) => {
  //   console.log(address);
  //   setValue(address, false);
  //   clearSuggestions();

  //   try {
  //     const results = await getGeocode({ address });
  //     const { lat, lng } = await getLatLng(results[0]);
  //     panTo({ lat, lng, results });
  //   } catch (error) {
  //     console.log("😱 Error: ", error);
  //   }
  // };
  const [addressOpen, setAddressOpen] = React.useState(false);
  const onSubmit = (data) => console.log("data", data);
  function openAddressForm(e) {
    setAddressOpen(!addressOpen);
    console.log(e.target.id);
    var x = document.getElementById(e.target.id + "Cont");
    if (window.getComputedStyle(x).display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  // const ref = useOnclickOutside(() => {
  //   // When user clicks outside of the component, we can dismiss
  //   // the searched suggestions by calling this method
  //   clearSuggestions();
  // });
  renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <span className="counter">Render Count: {renderCount}</span>
      <div>
        {fields.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`pickupBlock addBlock ${addressOpen ? "active" : ""}`}
            >
              <div
                id={"test" + (index + 1)}
                className="heading"
                onClick={openAddressForm}
              >
                <i className="icon pickup" />
                {index + 1} Pickup
                <span className="icon plus" />
              </div>
              <div>
                <button onClick={() => remove(index)}>Remove</button>
              </div>
              <div
                id={"test" + (index + 1) + "Cont"}
                style={{ display: "none" }}
              >
                <label htmlFor="orderdesc">Order Description</label>
                <input
                  className="form-control"
                  placeholder="Enter Order Discription"
                  name={`pickupDtls[${index}].jd`}
                  defaultValue={item.jd}
                  ref={register()}
                />
              </div>

              <div className="search">
                {/* <Search /> */}
                <Controller
                  as={<Search />}
                  name={`pickupDtls[${index}].address`}
                  control={control}
                  defaultValue=""
                />
                {/* <Controller
                  as={
                    <Combobox onSelect={handleSelect}>
                      <ComboboxInput
                        name={`pickupDtls[${index}].address`}
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Search your location"
                        ref={register}
                      />
                      <ComboboxPopover>
                        <ComboboxList>
                          {status === "OK" &&
                            data.map(({ place_id, description }) => (
                              <ComboboxOption
                                key={place_id}
                                value={description}
                              />
                            ))}
                        </ComboboxList>
                      </ComboboxPopover>
                    </Combobox>
                  }
                  name={`pickupDtls[${index}].address`}
                  control={control}
                /> */}
              </div>
            </div>
          );
        })}
      </div>
      <section>
        <button
          type="button"
          onClick={() => {
            append({
              firstName: "appendBill",
              lastName: "appendLuo",
              test: "test"
            });
          }}
        >
          append
        </button>
      </section>

      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
