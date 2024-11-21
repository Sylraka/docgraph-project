package com.example.accessing_data_mongodb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import com.example.accessing_data_mongodb.Collections.CollectionRepository;
import com.example.accessing_data_mongodb.Collections.Collections;


//@SpringBootApplication is a convenience annotation that adds all of the following:
//@Configuration: Tags the class as a source of bean definitions for the application context.
//@EnableAutoConfiguration: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property 
//settings. For example, if spring-webmvc is on the classpath, this annotation flags the application as a web application and 
//activates key behaviors, such as setting up a DispatcherServlet.
//@ComponentScan: Tells Spring to look for other components, configurations, and services in the com/example package, letting it 
//find the controllers.

@SpringBootApplication
@EnableMongoAuditing //for timestamps
public class AccessingDataMongodbApplication implements CommandLineRunner {

	//Spring Data MongoDB dynamically creates a proxy and injects it there
  @Autowired
  private CollectionRepository repository;

  public static void main(String[] args) {
    SpringApplication.run(AccessingDataMongodbApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {

    //repository.deleteAll();

    // save a couple of customers
    //repository.save(new Collections("das ist eine autogenerierte collection"));

    // fetch all customers
    System.out.println("collection found with findAll():");
    System.out.println("-------------------------------");
    for (Collections collection : repository.findAll()) {
      System.out.println(collection);
    }
    System.out.println();

    // fetch an individual customer
    System.out.println("Customer found with findByCollectionName('Machine Learning'):");
    System.out.println("--------------------------------");
    System.out.println(repository.findByCollectionName("Machine Learning"));



  }

}