import React, { useState, useEffect } from "react";
import { useInvoiceListData } from "../redux/hooks";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { bulkUpdate } from "../redux/invoicesSlice";
import { useNavigate } from "react-router-dom";

const BulkEdit = () => {
    const { invoiceList } = useInvoiceListData();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [editedList, setEditedList] = useState([...invoiceList]);
    const [itemToggle, setItemToggle] = useState("");
    const [editItem, setEditItem] = useState("");

    const handleEdit = (id, itemId, field, value) => {
        console.log(id, itemId, field, value);
        const updatedList = editedList.map((invoice) => {
            if (invoice.id === id) {
                if (itemId) {
                    return {
                        ...invoice,
                        items: invoice.items.map((item) =>
                            item.itemId === itemId
                                ? {
                                    ...item,
                                    [field]: field === "itemPrice" || field === "itemQuantity"
                                        ? parseFloat(value).toFixed(2)
                                        : value,
                                }
                                : item
                        ),
                    };
                } else {
                    return {
                        ...invoice,
                        [field]: value, 
                        items: invoice.items.map((item) => ({
                            ...item,
                            [field]: field === "itemPrice" || field === "itemQuantity"
                                ? parseFloat(value).toFixed(2)
                                : value,
                        })),
                    };
                    
                }

            }
            return invoice;
        });

        setEditedList(updatedList);

        if (field === "taxRate" || field === "discountRate") {
            handleCalculateTotal(id);
        } else if (field === "itemPrice" || field === "itemQuantity") {
            handleCalculateTotalForItems(id);
        }
    };

    const handleCalculateTotalForItems = (id) => {
        setEditedList((prevEditedList) => {
            return prevEditedList.map((invoice) => {
                if (invoice.id === id) {
                    let subTotal = 0;

                    invoice.items.forEach((item) => {
                        subTotal +=
                            parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity);
                    });

                    const taxAmount = parseFloat(
                        subTotal * (invoice.taxRate / 100)
                    ).toFixed(2);
                    const discountAmount = parseFloat(
                        subTotal * (invoice.discountRate / 100)
                    ).toFixed(2);
                    const total = (
                        subTotal -
                        parseFloat(discountAmount) +
                        parseFloat(taxAmount)
                    ).toFixed(2);

                    return {
                        ...invoice,
                        subTotal: parseFloat(subTotal).toFixed(2),
                        taxAmount,
                        discountAmount,
                        total,
                    };
                } else {
                    return invoice;
                }
            });
        });
    };

    const handleCalculateTotal = (id) => {
        setEditedList((prevEditedList) => {
            return prevEditedList.map((invoice) => {
                if (invoice.id === id) {
                    let subTotal = 0;

                    invoice.items.forEach((item) => {
                        subTotal +=
                            parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity);
                    });

                    const taxAmount = parseFloat(
                        subTotal * (invoice.taxRate / 100)
                    ).toFixed(2);
                    const discountAmount = parseFloat(
                        subTotal * (invoice.discountRate / 100)
                    ).toFixed(2);
                    const total = (
                        subTotal -
                        parseFloat(discountAmount) +
                        parseFloat(taxAmount)
                    ).toFixed(2);

                    return {
                        ...invoice,
                        subTotal: parseFloat(subTotal).toFixed(2),
                        taxAmount,
                        discountAmount,
                        total,
                    };
                } else {
                    return invoice;
                }
            });
        });
    };


    return (
        <Row>
            <Col className="mx-auto">
                <h3 className="fw-bold pb-2 pb-md-4 text-center">BULK EDIT</h3>
                <Card className="d-flex p-3 p-md-4 my-3 my-md-4">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Bill To</th>
                                <th>Bill To Email</th>
                                <th>Bill To Address</th>
                                <th>Bill From</th>
                                <th>Bill From Email</th>
                                <th>Bill From Address</th>
                                <th>Currency</th>
                                <th>Items</th>
                                <th>Tax Rate</th>
                                <th>Tax Amount</th>
                                <th>Discount Rate</th>
                                <th>Discount Amount</th>
                                <th>Total</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editedList.map((invoice) => (

                                <tr key={invoice.id}>
                                    <td>{invoice.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={invoice.billTo}
                                            onChange={(e) =>
                                                handleEdit(invoice.id, "", "billTo", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            value={invoice.billToEmail}
                                            onChange={(e) =>
                                                handleEdit(
                                                    invoice.id,
                                                    "",
                                                    "billToEmail",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={invoice.billToAddress}
                                            onChange={(e) =>
                                                handleEdit(
                                                    invoice.id,
                                                    "",
                                                    "billToAddress",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={invoice.billFrom}
                                            onChange={(e) =>
                                                handleEdit(invoice.id, "", "billFrom", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            value={invoice.billFromEmail}
                                            onChange={(e) =>
                                                handleEdit(
                                                    invoice.id,
                                                    "",
                                                    "billFromEmail",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={invoice.billFromAddress}
                                            onChange={(e) =>
                                                handleEdit(
                                                    invoice.id,
                                                    "",
                                                    "billFromAddress",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={invoice.currency}
                                            onChange={(e) =>

                                                handleEdit(invoice.id, "", "currency", e.target.value)
                                            }
                                        >
                                            <option value="$">USD (United States Dollar)</option>
                                            <option value="£">GBP (British Pound Sterling)</option>
                                            <option value="$">CAD (Canadian Dollar)</option>
                                            <option value="¥">JPY (Japanese Yen)</option>
                                            <option value="$">AUD (Australian Dollar)</option>
                                            <option value="$">SGD (Singapore Dollar)</option>
                                            <option value="¥">CNY (Chinese Renminbi)</option>
                                            <option value="₿">BTC (Bitcoin)</option>
                                        </select>
                                    </td>
                                    <td>
                                        {invoice.id === itemToggle ? (

                                            <div className="text-center">
                                                <Button
                                                    className="bg-dark p-2"
                                                    onClick={() => setItemToggle("")}
                                                >
                                                    X
                                                </Button>
                                                {invoice.items.map((item) => (
                                                    <React.Fragment key={item.itemId}>
                                                        <div className="my-2 border p-2">
                                                            {editItem === item.itemId ? (
                                                                <div>
                                                                    <Button
                                                                        className="bg-info p-1"
                                                                        onClick={() => setEditItem("")}
                                                                    >
                                                                        X
                                                                    </Button>
                                                                    <div className="mb-3">
                                                                        <label className="fw-bold" htmlFor={`itemName_${item.itemId}`}>Name</label>
                                                                        <input
                                                                            id={`itemName_${item.itemId}`}
                                                                            type="text"
                                                                            value={item.itemName}
                                                                            onChange={(e) =>
                                                                                handleEdit(
                                                                                    invoice.id,
                                                                                    item.itemId,
                                                                                    "itemName",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="fw-bold" htmlFor={`itemDescription_${item.itemId}`}>
                                                                            Description
                                                                        </label>
                                                                        <input
                                                                            id={`itemDescription_${item.itemId}`}
                                                                            type="text"
                                                                            value={item.itemDescription}
                                                                            onChange={(e) =>
                                                                                handleEdit(
                                                                                    invoice.id,
                                                                                    item.itemId,
                                                                                    "itemDescription",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="fw-bold" htmlFor={`itemQuantity_${item.itemId}`}>
                                                                            Quantity
                                                                        </label>
                                                                        <input
                                                                            id={`itemQuantity_${item.itemId}`}
                                                                            type="number"
                                                                            value={item.itemQuantity}
                                                                            onChange={(e) =>
                                                                                handleEdit(
                                                                                    invoice.id,
                                                                                    item.itemId,
                                                                                    "itemQuantity",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <label className="fw-bold fs-"  htmlFor={`itemPrice_${item.itemId}`}>Price</label>
                                                                        <input
                                                                            id={`itemPrice_${item.itemId}`}
                                                                            type="number"
                                                                            value={item.itemPrice}
                                                                            onChange={(e) =>
                                                                                handleEdit(
                                                                                    invoice.id,
                                                                                    item.itemId,
                                                                                    "itemPrice",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <Button
                                                                        className="bg-danger my-2"
                                                                        onClick={() => setEditItem(item.itemId)}
                                                                    >
                                                                        {item.itemName}
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ) : (
                                            <div>
                                                <Button
                                                    onClick={() => {
                                                        setEditItem("");
                                                        setItemToggle(invoice.id);
                                                    }}
                                                >
                                                    Items
                                                </Button>
                                            </div>
                                        )}
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            value={invoice.taxRate}
                                            onChange={(e) =>
                                                handleEdit(invoice.id, "", "taxRate", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <p>{invoice.taxAmount}</p>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={invoice.discountRate}
                                            onChange={(e) =>
                                                handleEdit(
                                                    invoice.id,
                                                    "",
                                                    "discountRate",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <p>{invoice.discountAmount}</p>
                                    </td>
                                    <td>
                                        <p>{invoice.total}</p>
                                    </td>
                                    <td>
                                        <p>{invoice.subTotal}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button
                        disabled={editedList.length === 0}
                        onClick={() => {
                            console.log(editedList);
                            dispatch(bulkUpdate(editedList));
                            alert("CHANGES SAVED");
                            navigate("/");
                        }}
                    >
                        SAVE CHANGES
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default BulkEdit;
