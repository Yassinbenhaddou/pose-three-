import {Ammo} from "./ammo.js";
import 'index.css'

//ball renderer script (this script is to render a simple ball that uses physics and is affected by gravity)


export class BallRenderer {

    //generate simple ball using ammo.js
    constructor() {

        //create a world
        const world = new Ammo.btDiscreteDynamicsWorld(
            new Ammo.btDispatcher(),
            new Ammo.btDbvtBroadphase(),
            new Ammo.btSequentialImpulseConstraintSolver(),
            new Ammo.btDefaultCollisionConfiguration()
        );

        //set gravity
        world.setGravity(new Ammo.btVector3(0, -9.8, 0));

        //create a ball
        const ballShape = new Ammo.btSphereShape(1);
        const ballTransform = new Ammo.btTransform();
        ballTransform.setIdentity();
        ballTransform.setOrigin(new Ammo.btVector3(0, 10, 0));
        const ballMass = 1;
        const ballLocalInertia = new Ammo.btVector3(0, 0, 0);
        ballShape.calculateLocalInertia(ballMass, ballLocalInertia);
        const ballMotionState = new Ammo.btDefaultMotionState(ballTransform);
        const ballRigidBodyCI = new Ammo.btRigidBodyConstructionInfo(
            ballMass,
            ballMotionState,
            ballShape,
            ballLocalInertia
        );
        const ballRigidBody = new Ammo.btRigidBody(ballRigidBodyCI);
        world.addRigidBody(ballRigidBody);

        //create a plane
        const planeShape = new Ammo.btStaticPlaneShape(
            new Ammo.btVector3(0, 1, 0),
            0
        );
        const planeTransform = new Ammo.btTransform();
        planeTransform.setIdentity();
        const planeMass = 0;
        const planeLocalInertia = new Ammo.btVector3(0, 0, 0);
        const planeMotionState = new Ammo.btDefaultMotionState(planeTransform);
        const planeRigidBodyCI = new Ammo.btRigidBodyConstructionInfo(
            planeMass,
            planeMotionState,
            planeShape,
            planeLocalInertia
        );
        const planeRigidBody = new Ammo.btRigidBody(planeRigidBodyCI);
        world.addRigidBody(planeRigidBody);

        //create a debug drawer
        const debugDrawer = new Ammo.btIDebugDraw();
        debugDrawer.drawLine = (from, to, color) => {
            console.log(
                `from: ${from.x()}, ${from.y()}, ${from.z()}`,
                `to: ${to.x()}, ${to.y()}, ${to.z()}`,
                `color: ${color.x()}, ${color.y()}, ${color.z()}`
            );
        };
        debugDrawer.drawContactPoint = () => {};
        debugDrawer.reportErrorWarning = () => {};
        debugDrawer.draw3dText = () => {};
        debugDrawer.setDebugMode = () => {};
        debugDrawer.getDebugMode = () => {};
        world.setDebugDrawer(debugDrawer);

        //update the world

        const update = () => {

            world.stepSimulation(1 / 60, 10);

            const ms = ballMotionState;
            ms.getWorldTransform(ballTransform);
            const p = ballTransform.getOrigin();
            const q = ballTransform.getRotation();
            console.log(
                `position: ${p.x()}, ${p.y()}, ${p.z()}`,
                `quaternion: ${q.x()}, ${q.y()}, ${q.z()}, ${q.w()}`
            );

            requestAnimationFrame(update);

        }

        update();

    }

}





