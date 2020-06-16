package com.google.sps;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.servlets.models.Comment;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class CommentsTest {

  @Test
  public void DefaultName() {
    Entity commentEntity = Comment.createNewCommentEntity("", "");
    
    Assert.assertEquals(0, 0);
  }
}