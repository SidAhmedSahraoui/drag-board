import { FC, useState } from "react";
import { Button, Input } from "../components";
import { Container, Modal, Items } from "../layouts";

import {
  useStore,
  findContainerItems,
  findItemTitle,
  handleDragEnd,
  handleDragMove,
  handleDragStart,
  onAddContainer,
  onAddItem,
  onDeleteContainer,
  onEditContainer,
  onEditItem,
  openEditItemModal,
  openEditModal,
  findContainerTitle,
  onDeleteItem,
  findContainerNameByItemId,
  isContainerNameEmpty,
  isItemNameEmpty,
  isEditingContainerNameChanged,
  isEditingItemNameChanged,
} from "../lib";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Squares2X2Icon, TrashIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Portfolio: FC = () => {
  const [containerName, setContainerName] = useState("");
  const { containers, setContainers, addContainer, deleteContainer, editContainer, addItem, deleteItem, editItem } = useStore();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditContainerModal, setShowEditContainerModal] = useState(false);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();
  const [itemName, setItemName] = useState("");
  const [editingContainer, setEditingContainer] =
    useState<UniqueIdentifier | null>(null);
  const [editingContainerName, setEditingContainerName] = useState("");

  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<UniqueIdentifier | null>(null);
  const [editingItemName, setEditingItemName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const containerNameForEditingItem = findContainerNameByItemId(
    containers,
    editingItem
  );

  return (
    <div className="w-full p-6">
      <Modal
        showModal={showAddContainerModal}
        setShowModal={setShowAddContainerModal}
      >
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-xl md:text-2xl font-bold text-center mx-auto">
            Add Container
          </h1>
          <Input
            type="text"
            placeholder="Container Title"
            name="containername"
            value={containerName}
            onChange={(event) => setContainerName(event.target.value)}
          />
          <Button
            fullWidth={true}
            label="Add container"
            onClick={() =>
              onAddContainer(
                containerName,
                setContainerName,
                setShowAddContainerModal,
                addContainer
              )
            }
            disabled={isContainerNameEmpty(containerName)}
          />
        </div>
      </Modal>
      <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-xl md:text-2xl font-bold text-center mx-auto">
            Add Card
          </h1>
          <Input
            type="text"
            placeholder="Card Title"
            name="card-name"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
          <Button
            fullWidth={true}
            label="Add Card"
            onClick={() =>
              onAddItem(
                itemName,
                currentContainerId,
                addItem,
                setItemName,
                setShowAddItemModal,
                
              )
            }
            disabled={isItemNameEmpty(itemName)}
          />
        </div>
      </Modal>
      <Modal
        showModal={showEditContainerModal}
        setShowModal={setShowEditContainerModal}
      >
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-xl md:text-2xl font-bold text-center mx-auto">
            Edit Container
          </h1>
          <Input
            type="text"
            placeholder="Container Title"
            name="containername"
            value={editingContainerName}
            onChange={(event) => setEditingContainerName(event.target.value)}
          />
          <Button
            fullWidth={true}
            label="Edit container"
            onClick={() =>
              onEditContainer(
                editingContainerName,
                editingContainer,
                editContainer,
                setEditingContainer,
                setEditingContainerName,
                setShowEditContainerModal
              )
            }
            disabled={
              !isEditingContainerNameChanged(
                editingContainerName,
                editingContainer,
                containers
              )
            }
          />
        </div>
      </Modal>
      <Modal showModal={showEditItemModal} setShowModal={setShowEditItemModal}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Squares2X2Icon className="h-6 w-6 text-gray-500" />
            <h1 className="leading-[1]">
              <span className="text-base font-semibold md:font-medium">
                {editingItemName}
              </span>{" "}
              <br />
              <span className="text-sm text-gray-500">
                in list {containerNameForEditingItem}
              </span>
            </h1>
          </div>
          <Button
            bgLight={true}
            variant="ghost"
            label=""
            icon={<TrashIcon className="h-6 w-6 text-red-400" />}
            onClick={() =>
              onDeleteItem(
                editingItem,
                currentContainerId,
                deleteItem,
                setEditingItem,
                setShowEditItemModal
              )
            }
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3 mb-3">
            <DocumentTextIcon className="h-6 w-6 text-gray-500" />
            <span className="text-base font-semibold md:font-medium">
              Card Title
            </span>{" "}
          </div>
          <Input
            type="text"
            placeholder="Card Title"
            name="card-name"
            value={editingItemName}
            onChange={(event) => setEditingItemName(event.target.value)}
          />{" "}
          <div className="flex justify-between w-full gap-3 mt-2">
            <Button
              bgLight={true}
              fullWidth={true}
              variant="ghost"
              label="Cancel"
              onClick={() => setShowEditItemModal(false)}
            />
            <Button
              fullWidth={true}
              label="Save"
              onClick={() =>
                onEditItem(
                  editingItemName,
                  editingItem,
                  currentContainerId,
                  editItem,
                  setEditingItem,
                  setShowEditItemModal
                )
              }
              disabled={
                !isEditingItemNameChanged(
                  editingItemName,
                  editingItem,
                  containers
                )
              }
            />
          </div>
        </div>
      </Modal>
      <div className="flex items-center justify-between gap-y-2">
        <Link
          to="/"
          className="text-gray-50 text-xl md:text-3xl font-bold">
            DragBoard
        </Link>
        <Button
          onClick={() => setShowAddContainerModal(true)}
          label="Add Container"
        />
      </div>
      <div className="mt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={(event) => handleDragStart(event, setActiveId)}
            onDragMove={(event) =>
              handleDragMove(event, containers, setContainers)
            }
            onDragEnd={(event) =>
              handleDragEnd(event, containers, setContainers, setActiveId)
            }
          >
            <SortableContext items={containers.map((item) => item.id)}>
              {containers.map((container) => (
                <Container
                  id={container.id}
                  title={container.title}
                  key={container.id}
                  onAddItem={() => {
                    setShowAddItemModal(true);
                    setCurrentContainerId(container.id);
                  }}
                  onEdit={() =>
                    openEditModal(
                      setEditingContainer,
                      setEditingContainerName,
                      setShowEditContainerModal,
                      container.id,
                      container.title
                    )
                  }
                  onDelete={() =>
                    onDeleteContainer(container.id, deleteContainer)
                  }
                >
                  <SortableContext
                    items={container.items.map((item) => item.id)}
                  >
                    <div className="flex items-start flex-col gap-y-2">
                      {container.items.map((item) => (
                        <Items
                          title={item.title}
                          id={item.id}
                          key={item.id}
                          onEdit={() =>
                            openEditItemModal(
                              setEditingItem,
                              setEditingItemName,
                              setShowEditItemModal,
                              item.id,
                              item.title
                            )
                          }
                        />
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {activeId && activeId.toString().includes("item") && (
                <Items
                  id={activeId}
                  title={findItemTitle(containers, activeId)}
                />
              )}
              {activeId && activeId.toString().includes("container") && (
                <Container
                  id={activeId}
                  title={findContainerTitle(containers, activeId)}
                >
                  {findContainerItems(containers, activeId).map((item) => (
                    <Items key={item.id} title={item.title} id={item.id} />
                  ))}
                </Container>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;